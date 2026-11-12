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

test('53 historical slugs survive; exactly 18 revisions and all 35 original records remain byte-equivalent as data',()=>{
  assert.equal(blog.posts.length,53)
  assert.equal(new Set(blog.posts.map(p=>p.slug)).size,53)
  assert.deepEqual(new Set(blog.posts.map(p=>p.slug)),new Set([...preserved.map(p=>p.slug),...authorized]))
  for(const baseline of preserved){const post=blog.posts.find(p=>p.slug===baseline.slug);assert.equal(crypto.createHash('sha256').update(JSON.stringify(post)).digest('hex'),baseline.sha256)}
  assert.deepEqual(new Set(blog.posts.filter(p=>p.updatedAt).map(p=>p.slug)),new Set(authorized))
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
