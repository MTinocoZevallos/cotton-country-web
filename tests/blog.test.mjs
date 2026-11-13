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

test('53 historical slugs survive; only Guardapolvo revised and all 35 untouched records remain byte-equivalent as data',()=>{
  assert.equal(blog.posts.length,53)
  assert.equal(new Set(blog.posts.map(p=>p.slug)).size,53)
  assert.deepEqual(new Set(blog.posts.map(p=>p.slug)),new Set([...preserved.map(p=>p.slug),...authorized]))
  for(const baseline of preserved){const post=blog.posts.find(p=>p.slug===baseline.slug);assert.equal(crypto.createHash('sha256').update(JSON.stringify(post)).digest('hex'),baseline.sha256)}
  assert.deepEqual(new Set(blog.posts.filter(p=>p.updatedAt).map(p=>p.slug)),new Set(['el-uniforme-de-farmacia']))
  for(const post of blog.posts){assert.equal(blog.postPath(post),'/'+post.slug);assert.equal(post.publishedAt,undefined);assert(blog.categoryForPost(post));assert(blog.descriptionForPost(post).length>60)}
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
  for(const post of blog.posts){const graph=blog.postStructuredData(post)['@graph'];const article=graph.find(x=>x['@type']==='BlogPosting');assert.equal(article.url,'https://cottoncountry.com.pe/'+post.slug);assert.equal(article.mainEntityOfPage['@id'],article.url);assert.equal(article.datePublished,undefined);assert.equal(article.author,undefined);assert.equal(article.dateModified,post.updatedAt);assert.equal(graph[1].itemListElement.at(-1).item,article.url)}
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
  assert.equal(publication.orderPostsByPublication(blog.posts)[0].slug,blog.posts.at(-1).slug)
})
test('original IA interview retains both measurement tables and all original cell values',()=>{
  const post=blog.posts.find(p=>p.slug==='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano')
  const tables=content.parseContent(post.content).filter(b=>b.type==='table')
  assert.equal(tables.length,2);assert.deepEqual(tables[0].rows[0],['XS','80-84','60-64','86-90']);assert.deepEqual(tables[1].rows.at(-1),['XXL','108-112','96-100','110-114'])
  assert(tables.every(t=>t.rows.length===6));assert(post.content.includes('(Cotton Country)'))
})

test('all 52 articles outside the authorized Guardapolvo update match their original Git versions',()=>{
  const baselines=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-original-52.json')))
  assert.equal(baselines.length,52)
  for(const baseline of baselines){const post=blog.posts.find(p=>p.slug===baseline.slug);assert.equal(crypto.createHash('sha256').update(JSON.stringify(post)).digest('hex'),baseline.sha256,baseline.slug)}
  assert.equal(blog.getPostImage('el-uniforme-de-farmacia').visible,false)
  const metadata=blog.postMetadata(blog.posts.find(p=>p.slug==='el-uniforme-de-farmacia'))
  assert.deepEqual(metadata.openGraph.images,[])
})
