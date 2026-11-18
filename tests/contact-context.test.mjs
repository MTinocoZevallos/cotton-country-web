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
function fixture({ resendError = null, resendException = null } = {}) {
  const sent = [], verified = [], logged = [], cache = new Map()
  let captchaSuccess = true
  const context = vm.createContext({
    console: { ...console, error: (...args) => logged.push(args) }, Request, Response, URLSearchParams,
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
      if (name === 'resend') return { Resend: class { emails = { send: async payload => {
        sent.push(payload)
        if (resendException) throw resendException
        return resendError ? { data: null, error: resendError } : { data: { id: 'test' }, error: null }
      } } } }
      if (name.startsWith('@/')) return load(path.join(root, name.slice(2) + '.ts'))
      if (name.startsWith('.')) return load(path.resolve(path.dirname(file), name + '.ts'))
      return nativeRequire(name)
    }
    vm.runInContext(`(function(require,module,exports){${source}\n})`, context, { filename: file })(localRequire, compiledModule, compiledModule.exports)
    return compiledModule.exports
  }
  return { data: load(path.join(root, 'lib/uniforms.ts')), models: load(path.join(root, 'lib/garment-models.ts')).garmentModels, helpers: load(path.join(root, 'lib/contact-context.ts')), POST: load(path.join(root, 'app/api/contact/route.ts')).POST, sent, verified, logged, failCaptcha: () => { captchaSuccess = false } }
}
const valid = { name: 'Prueba', phone: '999999999', email: 'test@example.org', ruc: '20123456789', message: 'Prueba local', turnstileToken: 'local-token' }
const request = body => new Request('http://localhost/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

test('the catalog contains exactly 46 distinct approved models and no legacy photographs', () => {
  const { data, models } = fixture()
  const counts = { camisas: 5, blusas: 7, 'pantalones-dama': 6, 'pantalones-caballero': 6, casacas: 7, polos: 4, chalecos: 7, sacos: 3, guardapolvos: 1 }
  assert.equal(data.garments.length, 46)
  assert.equal(new Set(data.garments.map(item => item.id)).size, 46)
  assert.equal(new Set(data.garments.map(item => item.image)).size, 46)
  for (const [category, count] of Object.entries(counts)) {
    const items = data.garments.filter(item => item.category === category)
    assert.equal(items.length, count)
    assert.deepEqual(plain(items.map(item => item.number)), Array.from({ length: count }, (_, index) => String(index + 1).padStart(2, '0')))
    assert.deepEqual(plain(items.map(item => item.name)), plain(models[category].map(item => item.title)))
  }
  for (const item of data.garments) {
    assert(!item.image.includes('/home-2027/'))
    assert(fs.existsSync(path.join(root, 'public', item.image)))
    assert(item.description.length > 40)
    assert.equal(item.caseId, undefined)
  }
})

test('jacket copy is generic and each editorial family retains its commercial contact context', () => {
  const { models, helpers } = fixture()
  assert.deepEqual(plain(models.casacas.map(item => item.title)), ['Casaca doble desmontable', 'Casaca tipo saco impermeable', 'Casaca impermeable con cintas reflectivas', 'Casaca sport elegante', 'Casaca acolchada', 'Casaca softshell', 'Casaca de drill industrial'])
  for (const { image, ...copy } of models.casacas) {
    assert(image.startsWith('/prendas/casaca-'))
    assert(!/zoomlion|\bcip\b|ineco|glencore|electrodunas|minera bateas|colegio de ingenieros/i.test(JSON.stringify(copy)))
    assert(copy.details.length >= 2)
  }
  assert.deepEqual(plain(helpers.sanitizeContactContext({ source_path: "/uniformes", garment_category: "guardapolvos" })), { source_path: "/uniformes", interest_type: "prenda", garment_category: "guardapolvos" })
  for (const category of Object.keys(models).filter(category => category !== "guardapolvos")) {
    assert.deepEqual(plain(helpers.sanitizeContactContext({ source_path: `/uniformes/${category}` })), { source_path: `/uniformes/${category}`, interest_type: 'prenda', garment_category: category })
  }
})

test('known paths derive context, forged fields and external URLs are discarded', () => {
  const { helpers: h } = fixture()
  assert.deepEqual(plain(h.sanitizeContactContext({ source_path: '/uniformes/retail', sector: 'forged', case_id: '<script>' })), { source_path: '/uniformes/retail', interest_type: 'sector', sector: 'retail' })
  assert.deepEqual(plain(h.browserContactContext('/contacto', new URLSearchParams('source_path=/uniformes/camisas'))), { source_path: '/uniformes/camisas', interest_type: 'prenda', garment_category: 'camisas' })
  assert.deepEqual(plain(h.sanitizeContactContext({ source_path: '/uniformes', garment_category: 'pantalones-dama' })), { source_path: '/uniformes', interest_type: 'prenda', garment_category: 'pantalones-dama' })
  for (const source_path of ['https://evil.test', '//evil.test', '/uniformes/agroindustria/premex', '/uniformes\nInjected: yes', '/uniformes/../admin']) assert.deepEqual(plain(h.sanitizeContactContext({ source_path, sector: 'retail', case_id: 'decor-center' })), { source_path: '/contacto' })
  assert.deepEqual(plain(h.browserContactContext('/contacto', new URLSearchParams())), { source_path: '/contacto' })
  assert.deepEqual(plain(h.browserContactContext('/', new URLSearchParams())), { source_path: '/' })
})

test('Decor Center publishes four approved outfits; individual photos remain pending', () => {
  const { data } = fixture()
  assert.equal(data.projectCases.length, 6)
  assert.deepEqual(plain(data.sectors.filter(item => item.public).map(item => item.id)), ['educacion', 'retail'])
  assert.equal(data.garmentCategories.length, 9)
  assert.deepEqual(plain(data.publishedCases.map(item => item.id)), ['decor-center', 'avinka', 'isil', 'columbia'])
  const decor = data.publishedCases[0]
  assert.equal(decor.seasons.flatMap(season => season.outfits).filter(outfit => outfit.status === "published" && outfit.fullImage).length, 4)
  for (const season of decor.seasons) {
    assert.equal(season.outfits.length, 2)
    assert(season.outfits.every(outfit => outfit.status === "published" && outfit.fullImage && outfit.garmentIds.length === 0))
  }
  assert.deepEqual(plain(decor.pending), ['Fotografías individuales de las prendas'])
  for (const photo of decor.fullImages) assert(fs.existsSync(path.join(root, "public", photo.src)))
  for (const item of data.projectCases.filter(item => !["decor-center", "avinka", "isil", "columbia"].includes(item.id))) assert.equal(data.isPublishedCase({ ...item, status: 'published' }), false)
  for (const item of data.garments) assert(fs.existsSync(path.join(root, 'public', item.image)))
})

test('Columbia is one uniform with two original photographic variants and no invented garment images', () => {
  const { data } = fixture()
  const columbia = data.publishedCases.find(item => item.id === 'columbia')
  assert.equal(columbia.presentation, 'variants')
  assert.equal(columbia.seasons, undefined)
  assert.equal(columbia.garmentIds.length, 0)
  assert.deepEqual(plain(columbia.fullImages.map(photo => photo.caption)), ['Con saco — Invierno', 'Sin saco — Verano'])
  assert.deepEqual(plain(columbia.categories), ['sacos', 'blusas', 'pantalones-dama'])
  for (const photo of columbia.fullImages) assert(fs.existsSync(path.join(root, 'public', photo.src)))
})

test('ISIL has exactly one approved photograph per role in the requested order', () => {
  const { data } = fixture()
  const isil = data.publishedCases.find(item => item.id === 'isil')
  assert.equal(isil.presentation, 'roles')
  assert.equal(isil.fullImages.length, 5)
  assert.equal(isil.garmentIds.length, 0)
  assert.deepEqual(plain(isil.roles.map(role => role.id)), ['supervisoras', 'asesores', 'recursos-tecnologicos', 'prospeccion', 'harson'])
  assert.deepEqual(plain(isil.roles.map(role => role.photo.src)), plain(isil.fullImages.map(photo => photo.src)))
  assert.equal(new Set(isil.roles.map(role => role.photo.src)).size, 5)
  for (const photo of isil.fullImages) assert(fs.existsSync(path.join(root, 'public', photo.src)))
})

test('the actual POST includes sanitized sector/category/direct context in the prepared Resend message', async () => {
  for (const source of [{ source_path: '/uniformes/educacion/isil' }, { source_path: '/uniformes/educacion/columbia' }, { source_path: '/uniformes/retail/avinka' }, { source_path: '/uniformes/retail/decor-center' }, { source_path: '/uniformes/educacion' }, { source_path: '/uniformes/camisas' }, { source_path: '/uniformes', garment_category: 'pantalones-dama' }, { source_path: '/contacto' }]) {
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
    if (source.source_path === '/uniformes/educacion/isil') { assert(email.text.includes('interest_type: caso')); assert(email.text.includes('case_id: isil')); assert(email.text.includes('sector: educacion')) }
    if (source.source_path === '/uniformes/educacion/columbia') { assert(email.text.includes('interest_type: caso')); assert(email.text.includes('case_id: columbia')); assert(email.text.includes('sector: educacion')) }
    if (source.source_path === '/uniformes/educacion') assert(email.text.includes('sector: educacion'))
    if (source.source_path === '/uniformes/retail/avinka') { assert(email.text.includes('interest_type: caso')); assert(email.text.includes('case_id: avinka')); assert(email.text.includes('sector: retail')) }
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

test('contact API confirms success only after the simulated provider accepts the email', async () => {
  const f = fixture()
  const response = await f.POST(request(valid))
  assert.equal(response.status, 200)
  assert.deepEqual(await response.json(), { success: true, message: 'Solicitud enviada correctamente.' })
  assert.equal(f.sent.length, 1)
  assert.equal(f.sent[0].from, 'Cotton Country <web@cottoncountry.com.pe>')
  assert.deepEqual(plain(f.sent[0].to), ['info@cottoncountry.com.pe'])
  assert.equal(f.sent[0].replyTo, valid.email)
})

test('a resolved Resend error returns HTTP 500 without success or provider details', async () => {
  const f = fixture({ resendError: { name: 'validation_error', message: 'Private provider detail' } })
  const response = await f.POST(request(valid))
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: 'No se pudo enviar la solicitud. Inténtalo nuevamente.' })
  assert.equal(f.sent.length, 1)
  assert.equal(f.verified.length, 1)
})

test('a thrown Resend exception returns HTTP 500 without confirming success', async () => {
  const failure = new Error('Simulated provider exception')
  const f = fixture({ resendException: failure })
  const response = await f.POST(request(valid))
  assert.equal(response.status, 500)
  assert.deepEqual(await response.json(), { error: 'No se pudo enviar la solicitud. Inténtalo nuevamente.' })
  assert.equal(f.sent.length, 1)
  assert.equal(f.logged.length, 1)
  assert.equal(f.logged[0][0], failure)
})

// Run the real component's submit handler and rerender its message using isolated
// hook/DOM doubles. Neither the provider, CAPTCHA nor analytics can access a network.
function formFixture(api, respond) {
  const state = ['local-token', false, '', false], resets = { form: 0, captcha: 0 }, requests = []
  let stateIndex = 0, refIndex = 0
  const refs = [
    { current: { reset: () => { resets.form++ } } },
    { current: {} },
    { current: 'local-widget' },
  ]
  const window = { location: { pathname: '/contacto', search: '?source_path=/uniformes/camisas' }, dataLayer: [], turnstile: { reset: () => { resets.captcha++ } } }
  const context = vm.createContext({
    window, URLSearchParams, process: { env: {} },
    FormData: class { get(name) { return valid[name] } },
    fetch: async (url, options) => {
      assert.equal(url, '/api/contact')
      assert.equal(options.method, 'POST')
      requests.push(JSON.parse(options.body))
      return respond ? respond() : api.POST(request(requests.at(-1)))
    },
  })
  const jsx = (type, props) => ({ type, props })
  const localRequire = name => {
    if (name === 'react') return {
      useRef: () => refs[refIndex++],
      useState: () => {
        const index = stateIndex++
        return [state[index], value => { state[index] = value }]
      },
    }
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'fragment' }
    if (name === 'next/script') return { default: 'script' }
    if (name === '@/lib/contact-context') return api.helpers
    if (name.endsWith('.css')) return { default: {} }
    throw new Error('Unexpected component dependency: ' + name)
  }
  const mod = { exports: {} }, file = path.join(root, 'components/ContactForm.tsx')
  const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX } }).outputText
  vm.runInContext(`(function(require,module,exports){${source}\n})`, context, { filename: file })(localRequire, mod, mod.exports)
  const render = () => { stateIndex = 0; refIndex = 0; return mod.exports.default({}) }
  const nodes = tree => !tree || typeof tree !== 'object' ? [] : Array.isArray(tree) ? tree.flatMap(nodes) : [tree, ...nodes(tree.props?.children)]
  return {
    state, resets, requests, window,
    submit: () => nodes(render()).find(node => node.type === 'form').props.onSubmit({ preventDefault() {}, currentTarget: {} }),
    message: () => nodes(render()).find(node => node.type === 'p' && node.props.children === state[2]),
  }
}

test('frontend shows success and records exactly one local conversion after API confirmation', async () => {
  const f = fixture(), form = formFixture(f)
  await form.submit()
  assert.equal(form.state[1], false)
  assert.equal(form.state[3], true)
  assert.equal(form.message().props.className, 'text-sm text-green-700')
  assert.equal(form.message().props.children, 'Solicitud enviada correctamente. Te contactaremos pronto.')
  assert.deepEqual(form.resets, { form: 1, captcha: 1 })
  assert.deepEqual(plain(form.window.dataLayer), [{ event: 'formulario_enviado', form_name: 'contacto_cotton_country' }])
  assert.equal(form.requests[0].source_path, '/uniformes/camisas')
  assert(f.sent[0].text.includes('garment_category: camisas'))
})

test('frontend preserves entered fields and records no conversion for Resend errors or exceptions', async () => {
  for (const options of [{ resendError: { message: 'Simulated failure' } }, { resendException: new Error('Simulated exception') }]) {
    const form = formFixture(fixture(options))
    await form.submit()
    assert.equal(form.state[1], false)
    assert.equal(form.state[3], false)
    assert.equal(form.message().props.className, 'text-sm text-red-700')
    assert.equal(form.message().props.children, 'No se pudo enviar la solicitud. Inténtalo nuevamente.')
    assert.deepEqual(form.resets, { form: 0, captcha: 0 })
    assert.equal(form.window.dataLayer.length, 0)
  }
})

test('frontend requires explicit API success and never converts malformed responses or network failures', async () => {
  for (const respond of [
    () => Response.json({}),
    () => Response.json({ success: false }),
    () => Response.json({ success: 'true' }),
    () => new Response('Invalid JSON', { status: 200 }),
    () => Response.json({ success: true }, { status: 500 }),
    () => { throw new Error('Simulated connection failure') },
  ]) {
    const f = fixture(), form = formFixture(f, respond)
    await form.submit()
    assert.equal(form.state[1], false)
    assert.equal(form.state[3], false)
    assert.equal(form.message().props.className, 'text-sm text-red-700')
    assert.deepEqual(form.resets, { form: 0, captcha: 0 })
    assert.equal(form.window.dataLayer.length, 0)
    assert.equal(f.sent.length, 0)
  }
})
