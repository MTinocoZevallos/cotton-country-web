import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
const nativeRequire = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const plain = value => JSON.parse(JSON.stringify(value))

// Execute the real TS modules with isolated transport doubles; never send email or CAPTCHA requests.
function fixture() {
  const sent = [], verified = [], cache = new Map()
  let captchaSuccess = true
  const context = vm.createContext({
    console, Request, Response, URLSearchParams,
    process: { env: { RESEND_API_KEY: 're_local_test', TURNSTILE_SECRET_KEY: 'local_test' } },
    fetch: async (url, options) => {
      assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify')
      verified.push(options)
      return Response.json({ success: captchaSuccess })
    },
  })
  function load(file) {
    if (cache.has(file)) return cache.get(file).exports
    const compiledModule = { exports: {} }
    cache.set(file, compiledModule)
    const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText
    const localRequire = name => {
      if (name === 'resend') return { Resend: class { emails = { send: async payload => { sent.push(payload); return { data: { id: 'test' }, error: null } } } } }
      if (name.startsWith('@/')) return load(path.join(root, name.slice(2) + '.ts'))
      if (name.startsWith('.')) return load(path.resolve(path.dirname(file), name + '.ts'))
      return nativeRequire(name)
    }
    vm.runInContext(`(function(require,module,exports){${source}\n})`, context, { filename: file })(localRequire, compiledModule, compiledModule.exports)
    return compiledModule.exports
  }
  return { data: load(path.join(root, 'lib/uniforms.ts')), helpers: load(path.join(root, 'lib/contact-context.ts')), POST: load(path.join(root, 'app/api/contact/route.ts')).POST, sent, verified, failCaptcha: () => { captchaSuccess = false } }
}
const valid = { name: 'Prueba', phone: '999999999', email: 'test@example.org', ruc: '20123456789', message: 'Prueba local', turnstileToken: 'local-token' }
const request = body => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

test('known paths derive context, forged fields and external URLs are discarded', () => {
  const { helpers: h } = fixture()
  assert.deepEqual(plain(h.sanitizeContactContext({ source_path: '/uniformes/retail', sector: 'forged', case_id: '<script>' })), { source_path: '/uniformes/retail', interest_type: 'sector', sector: 'retail' })
  assert.deepEqual(plain(h.browserContactContext('/contacto', new URLSearchParams('source_path=/uniformes/camisas'))), { source_path: '/uniformes/camisas', interest_type: 'prenda', garment_category: 'camisas' })
  assert.deepEqual(plain(h.sanitizeContactContext({ source_path: '/uniformes', garment_category: 'pantalones-dama' })), { source_path: '/uniformes', interest_type: 'prenda', garment_category: 'pantalones-dama' })
  for (const source_path of ['https://evil.test', '//evil.test', '/uniformes/retail/avinka', '/uniformes\nInjected: yes', '/uniformes/../admin']) assert.deepEqual(plain(h.sanitizeContactContext({ source_path, sector: 'retail', case_id: 'decor-center' })), { source_path: '/contacto' })
  assert.deepEqual(plain(h.browserContactContext('/contacto', new URLSearchParams())), { source_path: '/contacto' })
  assert.deepEqual(plain(h.browserContactContext('/', new URLSearchParams())), { source_path: '/' })
})

test('only the approved Decor Center case is public; pending photos stay hidden', () => {
  const { data } = fixture()
  assert.equal(data.projectCases.length, 6)
  assert.equal(data.garmentCategories.length, 8)
  assert.deepEqual(plain(data.publishedCases.map(item => item.id)), ['decor-center'])
  const decor = data.publishedCases[0]
  assert.equal(decor.seasons.flatMap(season => season.outfits).filter(outfit => outfit.status === "published" && outfit.fullImage).length, 2)
  assert.equal(decor.seasons[0].outfits.find(outfit => outfit.id === "invierno-caballero").status, "draft")
  for (const photo of decor.fullImages) assert(fs.existsSync(path.join(root, "public", photo.src)))
  for (const item of data.projectCases.filter(item => item.id !== "decor-center")) assert.equal(data.isPublishedCase({ ...item, status: 'published' }), false)
  for (const item of data.garments) assert(fs.existsSync(path.join(root, 'public', item.image)))
})

test('the actual POST includes sanitized sector/category/direct context in the prepared Resend message', async () => {
  for (const source of [{ source_path: '/uniformes/retail/decor-center' }, { source_path: '/uniformes/educacion' }, { source_path: '/uniformes/camisas' }, { source_path: '/uniformes', garment_category: 'pantalones-dama' }, { source_path: '/contacto' }]) {
    const f = fixture()
    const response = await f.POST(request({ ...valid, ...source, case_id: 'forged', sector: 'wrong' }))
    assert.equal(response.status, 200)
    assert.equal(f.sent.length, 1)
    assert.equal(f.verified.length, 1)
    const email = f.sent[0]
    assert.equal(email.subject, 'Nueva solicitud de propuesta desde la web')
    assert.deepEqual(plain(email.to), ['info@cottoncountry.com.pe'])
    assert.equal(email.replyTo, valid.email)
    assert(email.text.includes(`source_path: ${source.source_path}`))
    assert(!email.text.includes('forged') && !email.text.includes('wrong'))
    if (source.garment_category) assert(email.text.includes(`garment_category: ${source.garment_category}`))
    if (source.source_path === '/uniformes/educacion') assert(email.text.includes('sector: educacion'))
    if (source.source_path === '/uniformes/retail/decor-center') { assert(email.text.includes('interest_type: caso')); assert(email.text.includes('case_id: decor-center')); assert(email.text.includes('sector: retail')) }
    if (source.source_path === '/contacto') assert(!email.text.includes('interest_type:'))
  }
})

test('required fields, corporate email, and Turnstile checks still prevent sending', async () => {
  for (const bad of [{ ...valid, name: '' }, { ...valid, email: 'personal@gmail.com' }, { ...valid, turnstileToken: '' }]) {
    const f = fixture(); assert.equal((await f.POST(request(bad))).status, 400); assert.equal(f.sent.length, 0); assert.equal(f.verified.length, 0)
  }
  const f = fixture(); f.failCaptcha(); assert.equal((await f.POST(request(valid))).status, 400); assert.equal(f.sent.length, 0); assert.equal(f.verified.length, 1)
})
