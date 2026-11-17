import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'
import { renderToStaticMarkup } from 'react-dom/server'
import { createElement } from 'react'
const require=createRequire(import.meta.url)
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const cache=new Map()
function load(file){
  if(cache.has(file))return cache.get(file).exports
  const compiledModule={exports:{}};cache.set(file,compiledModule)
  const source=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  const localRequire=name=>{
    if(!name.startsWith('.')&&!name.startsWith('@/'))return require(name)
    const base=name.startsWith('@/')?path.join(root,name.slice(2)):path.resolve(path.dirname(file),name)
    const target=[base+'.ts',base+'.tsx',path.join(base,'index.ts')].find(fs.existsSync)
    if(!target)throw Error('Missing test module '+name)
    return load(target)
  }
  new Function('require','module','exports',source)(localRequire,compiledModule,compiledModule.exports)
  return compiledModule.exports
}
const blog=load(path.join(root,'lib/blog/index.ts'))
const content=load(path.join(root,'lib/blog/content.ts'))
const paths=load(path.join(root,'lib/blog/paths.ts'))
const preserved=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-preserved-35.json')))
const authorized=JSON.parse(fs.readFileSync(path.join(root,'docs/blog-2027/articulos-autorizados.json')))

test('53 historical slugs survive; approved revisions remain scoped and all 35 untouched records remain byte-equivalent as data',()=>{
  assert.equal(blog.posts.length,53)
  assert.equal(new Set(blog.posts.map(p=>p.slug)).size,53)
  assert.deepEqual(new Set(blog.posts.map(p=>p.slug)),new Set([...preserved.map(p=>p.slug),...authorized]))
  for(const baseline of preserved){const post=blog.posts.find(p=>p.slug===baseline.slug);assert.equal(crypto.createHash('sha256').update(JSON.stringify(post)).digest('hex'),baseline.sha256)}
  assert.deepEqual(new Set(blog.posts.filter(p=>p.updatedAt).map(p=>p.slug)),new Set(['el-uniforme-de-farmacia']))
  for(const post of blog.posts){assert.equal(blog.postPath(post),'/'+post.slug);assert.equal(post.publishedAt,post.slug==='que-significa-tallas-completas-en-ropa'?'2022-08-18':post.slug==='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano'?'2023-02-28':post.slug==='ntp-para-la-designacion-de-tallas'?'2021-08-10':undefined);assert(blog.categoryForPost(post));assert(blog.descriptionForPost(post).length>60)}
})
test('all images are centralized, local, dimensioned and exist; optimized variants are preferred',async()=>{
  const sharp=require('sharp')
  for(const post of blog.posts){const image=blog.getPostImage(post.slug);assert(fs.existsSync(path.join(root,'public',image.src)));const m=await sharp(path.join(root,'public',image.src)).metadata();assert.equal(image.width,m.width);assert.equal(image.height,m.height);assert(image.alt.length>20)}
  assert(blog.getPostImage('como-definir-un-proyecto-de-uniformes-corporativos').src.endsWith('.webp'))
})
test('unsafe schemes and raw HTML cannot execute while valid emphasis, headings, lists and links render semantically',()=>{
  for(const href of ['javascript:alert(1)','data:text/html,test','vbscript:msgbox(1)','//evil.test'])assert.equal(paths.normalizeBlogHref(href),undefined)
  const {default:Content}=load(path.join(root,'components/blog/Content.tsx'))
  const blocks=content.parseContent('## Un título\n### Otro título\n* Uno\n* Dos\nTexto **importante** <a onclick="bad()" href="/blog/la-talla-peruana">válido</a>.\n<a href="jav&#x61;script:alert(1)">sin ejecución</a>\n<script>bad()</script>\n<img src=x onerror=bad()>')
  const html=renderToStaticMarkup(createElement(Content,{blocks}))
  assert(html.includes('<h2 id="un-titulo">'));assert(html.includes('<h3 id="otro-titulo">'));assert(html.includes('<ul>'));assert(html.includes('<strong>importante</strong>'));assert(html.includes('href="/la-talla-peruana"'))
  assert(!html.includes('<script>'));assert(!html.includes('<img '));assert(!html.includes('href="javascript:'));assert(!html.includes(' onclick='));assert(html.includes('sin ejecución'))
  assert.equal(content.parseContent('## Repetido\n## Repetido')[1].id,'repetido-2')
})
test('article schema agrees with canonical URLs and never fabricates publication dates or personal authors',()=>{
  for(const post of blog.posts){const graph=blog.postStructuredData(post)['@graph'];const article=graph.find(x=>x['@type']==='BlogPosting');assert.equal(article.url,'https://cottoncountry.com.pe/'+post.slug);assert.equal(article.mainEntityOfPage['@id'],article.url);assert.equal(article.datePublished,post.publishedAt);assert.equal(article.author,undefined);assert.equal(article.dateModified,post.updatedAt);assert.equal(graph[1].itemListElement.at(-1).item,article.url)}
  assert(!blog.serializeStructuredData({text:'</script><script>alert(1)</script>'}).includes('<'))
})
test('only identified aliases normalize; relative paths, queries and fragments remain usable',()=>{
  assert.equal(paths.normalizeBlogHref('/blog/la-talla-peruana/'),'/'+'la-talla-peruana')
  assert.equal(paths.normalizeBlogHref('http://www.cottoncountry.com.pe/blog/la-talla-peruana/?origen=archivo#seccion'),'/la-talla-peruana?origen=archivo#seccion')
  assert.equal(paths.normalizeBlogHref('/blog/no-identificado'),'/blog/no-identificado')
  assert.equal(paths.normalizeBlogHref('/uniformes/camisas'),'/uniformes/camisas')
  assert.equal(blog.pageNumber('0')>0,false)
})

const publication=load(path.join(root,'lib/blog/publication.ts'))
test('publication ordering uses original dates, keeps date-only days and rejects invalid dates',()=>{
  const a={...blog.posts[0],publishedAt:'2020-01-02',updatedAt:'2026-11-13'}
  const b={...blog.posts[1],publishedAt:'2024-10-03',updatedAt:'2024-10-03'}
  assert.deepEqual(publication.orderPostsByPublication([a,b]).map(p=>p.slug),[b.slug,a.slug])
  assert.equal(publication.publicationLabel('2024-10-03'),'3 de octubre de 2024')
  for(const date of ['2024-02-30','2024-10-03T00:00:00','invalid'])assert.equal(publication.originalPublicationTime(date),undefined)
  const undated=blog.posts.filter(post=>!post.publishedAt)
  assert.equal(publication.orderPostsByPublication(undated)[0].slug,undated.at(-1).slug)
})
test('original IA interview retains both measurement tables and all original cell values',()=>{
  const post=blog.posts.find(p=>p.slug==='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano')
  const tables=content.parseContent(post.content).filter(b=>b.type==='table')
  assert.equal(tables.length,2);assert.deepEqual(tables[0].rows[0],['XS','80-84','60-64','86-90']);assert.deepEqual(tables[1].rows.at(-1),['XXL','108-112','96-100','110-114'])
  assert(tables.every(t=>t.rows.length===6));assert(post.content.includes('(Cotton Country)'))
})

test('the 49 articles outside approved revisions match their original Git versions',()=>{
  const baselines=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-original-52.json'))).filter(p=>!['que-significa-tallas-completas-en-ropa','una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano','ntp-para-la-designacion-de-tallas'].includes(p.slug))
  assert.equal(baselines.length,49)
  for(const baseline of baselines){const post=blog.posts.find(p=>p.slug===baseline.slug);assert.equal(crypto.createHash('sha256').update(JSON.stringify(post)).digest('hex'),baseline.sha256,baseline.slug)}
  assert.equal(blog.getPostImage('el-uniforme-de-farmacia').visible,false)
  const metadata=blog.postMetadata(blog.posts.find(p=>p.slug==='el-uniforme-de-farmacia'))
  assert.deepEqual(metadata.openGraph.images,[])
})

const editorialBaseline=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-preserved-other-52.json')))
const digest=value=>crypto.createHash('sha256').update(typeof value==='string'?value:JSON.stringify(value)).digest('hex')
test('the article 1 baseline remains unchanged outside the approved articles 2 and 3',()=>{
  const remaining=editorialBaseline.otherPosts.filter(p=>!['una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano','ntp-para-la-designacion-de-tallas'].includes(p.slug))
  assert.equal(remaining.length,50)
  for(const before of remaining){
    const post=blog.posts.find(post=>post.slug===before.slug)
    assert.equal(digest(post),before.postSHA256,before.slug)
    assert.equal(digest(blog.postMetadata(post)),before.metadataSHA256,before.slug)
    assert.equal(digest(blog.postStructuredData(post)),before.structuredDataSHA256,before.slug)
  }
})
test('article 1 exactly preserves the approved body, separate SEO title, historic date and original image',()=>{
  const post=blog.posts.find(post=>post.slug==='que-significa-tallas-completas-en-ropa')
  const approved=fs.readFileSync(path.join(root,'tests/fixtures/tallas-completas-approved.md'),'utf8').trim()
  assert.equal(post.title,approved.split('\n')[0].slice(2))
  assert.equal(post.content.trim(),approved.replace(/^# [^\n]+\n\n/,''))
  assert.equal(post.publishedAt,'2022-08-18');assert.equal(post.updatedAt,undefined)
  assert.equal(blog.postMetadata(post).title,'Tallas completas en ropa: ¿son realmente la solución?')
  assert.equal(blog.postMetadata(post).description,'¿Qué son las tallas completas y cómo funcionan en los uniformes? Un patronista explica su origen y la importancia de las tablas de medidas.')
  assert.equal(content.parseContent(post.content).filter(block=>block.type==='heading'&&block.level===2).length,8)
  const image=blog.getPostImage(post.slug);assert.deepEqual(image,editorialBaseline.image)
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'public',image.src))).digest('hex'),editorialBaseline.imageSHA256)
})

const historical=load(path.join(root,'lib/blog/historical-chat.ts'))
const chatBaseline=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-preserved-outside-chat.json')))
test('article 2 preserves all three historical answers, all table cells, approved copy and the confirmed original date',()=>{
  const post=blog.posts.find(p=>p.slug==='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano')
  const original=fs.readFileSync(path.join(root,'tests/fixtures/chatgpt-conversation-original.txt'),'utf8').trim()
  assert.equal(historical.historicalChatSource(post.content),original)
  assert.deepEqual(historical.parseHistoricalChat(historical.historicalChatSource(post.content)),historical.parseHistoricalChat(original))
  const approved=fs.readFileSync(path.join(root,'tests/fixtures/ia-tablas-approved.md'),'utf8').trim()
  assert.equal(post.title,approved.split('\n')[0].slice(2));assert.equal(post.content.trim(),approved.replace(/^# [^\n]+\n\n/,''))
  assert.equal(post.publishedAt,'2023-02-28');assert.equal(post.updatedAt,undefined)
  assert.equal(blog.postMetadata(post).title,'Tablas de medidas para Perú: ¿qué nos respondió una IA?')
  assert.equal(blog.postMetadata(post).description,'Pedimos a ChatGPT tablas de medidas para mujeres y varones del Perú. Analizamos sus respuestas y qué tan confiables son para confeccionar ropa.')
  const oldTables=content.parseContent(original).filter(b=>b.type==='table'),newTables=content.parseContent(post.content).filter(b=>b.type==='table')
  assert.equal(newTables.length,2);assert.deepEqual(newTables,oldTables)
  assert.deepEqual(blog.getPostImage(post.slug),chatBaseline.image)
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'public',chatBaseline.image.src))).digest('hex'),chatBaseline.imageSHA256)
})
test('the article 2 baseline remains unchanged outside the approved article 3',()=>{
  assert.equal(chatBaseline.otherPosts.length,52)
  for(const before of chatBaseline.otherPosts.filter(p=>p.slug!=='ntp-para-la-designacion-de-tallas')){const post=blog.posts.find(p=>p.slug===before.slug);assert.equal(digest(post),before.postSHA256,before.slug);assert.equal(digest(blog.postMetadata(post)),before.metadataSHA256,before.slug);assert.equal(digest(blog.postStructuredData(post)),before.structuredDataSHA256,before.slug)}
})

const ntpBaseline=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-preserved-outside-ntp.json')))
test('article 3 retains the approved NTP body, historical date, canonical and original photograph',()=>{
  const post=blog.posts.find(p=>p.slug==='ntp-para-la-designacion-de-tallas')
  const approved=fs.readFileSync(path.join(root,'tests/fixtures/ntp-approved.md'),'utf8').trim()
  assert.equal(post.title,approved.split('\n')[0].slice(2))
  assert.equal(post.content.trim(),approved.replace(/^# [^\n]+\n\n/,''))
  assert.equal(post.publishedAt,'2021-08-10');assert.equal(post.updatedAt,undefined)
  const metadata=blog.postMetadata(post)
  assert.equal(metadata.title,'NTP-ISO 8559-2:2020: designación de tallas en Perú')
  assert.equal(metadata.description,'Conoce qué establece la NTP-ISO 8559-2:2020, cómo se designan las tallas y por qué las medidas corporales no equivalen a las de una prenda.')
  assert.equal(metadata.alternates.canonical,'/ntp-para-la-designacion-de-tallas')
  assert.equal(content.parseContent(post.content).filter(b=>b.type==='heading'&&b.level===2).length,5)
  assert.deepEqual(blog.getPostImage(post.slug),ntpBaseline.image)
  assert.equal(digest(fs.readFileSync(path.join(root,'public',ntpBaseline.image.src)).toString('base64')),ntpBaseline.imageSHA256)
})
test('all other 52 articles including approved articles 1 and 2 retain full content, metadata and schema',()=>{
  assert.equal(ntpBaseline.otherPosts.length,52)
  for(const before of ntpBaseline.otherPosts){const post=blog.posts.find(p=>p.slug===before.slug);assert.equal(digest(post),before.postSHA256,before.slug);assert.equal(digest(blog.postMetadata(post)),before.metadataSHA256,before.slug);assert.equal(digest(blog.postStructuredData(post)),before.structuredDataSHA256,before.slug)}
})
