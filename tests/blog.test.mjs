import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
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
test('social cards use one public absolute image with honest dimensions and retain article-specific metadata',async()=>{
  const sharp=require('sharp')
  for(const post of blog.posts){
    const meta=blog.postMetadata(post),image=meta.openGraph.images[0]
    assert.equal(meta.openGraph.images.length,1)
    assert.equal(meta.twitter.images.length,1)
    const url=new URL(image.url)
    assert.equal(url.origin,'https://cottoncountry.com.pe')
    const actual=await sharp(path.join(root,'public',decodeURIComponent(url.pathname))).metadata()
    assert.equal(image.width,actual.width);assert.equal(image.height,actual.height)
    assert(image.alt.length>0)
    assert.equal(meta.twitter.images[0].url,image.url)
    assert.equal(meta.twitter.card,'summary_large_image')
    assert.equal(meta.openGraph.type,'article')
    assert.equal(meta.openGraph.url,'https://cottoncountry.com.pe/'+post.slug)
    assert.equal(meta.openGraph.title,post.seoTitle??post.title)
    if(blog.getPostImage(post.slug).visible===false)assert.equal(url.pathname,'/social/cotton-country.png')
  }
  const brand=await sharp(path.join(root,'public/social/cotton-country.png')).metadata()
  assert.equal(brand.width,1200);assert.equal(brand.height,630)
})
test('Preview social assets use the deployment host while canonical and production URLs stay unchanged',()=>{
  const saved={VERCEL_ENV:process.env.VERCEL_ENV,VERCEL_URL:process.env.VERCEL_URL}
  try{
    process.env.VERCEL_ENV='preview';process.env.VERCEL_URL='cotton-review.example.vercel.app'
    const meta=blog.postMetadata(blog.posts[0])
    assert.equal(new URL(meta.openGraph.images[0].url).hostname,'cotton-review.example.vercel.app')
    assert.equal(meta.openGraph.url,'https://cottoncountry.com.pe/'+blog.posts[0].slug)
    assert.equal(meta.alternates.canonical,'/'+blog.posts[0].slug)
    process.env.VERCEL_ENV='production'
    assert.equal(new URL(blog.postMetadata(blog.posts[0]).openGraph.images[0].url).hostname,'cottoncountry.com.pe')
  }finally{for(const [key,value]of Object.entries(saved)){if(value===undefined)delete process.env[key];else process.env[key]=value}}
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
  const undated=blog.posts.slice(0,3).map(post=>({...post,publishedAt:undefined}))
  assert.equal(publication.orderPostsByPublication(undated)[0].slug,undated.at(-1).slug)
})
test('original IA interview retains both measurement tables and all original cell values',()=>{
  const post=blog.posts.find(p=>p.slug==='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano')
  const tables=content.parseContent(post.content).filter(b=>b.type==='table')
  assert.equal(tables.length,2);assert.deepEqual(tables[0].rows[0],['XS','80-84','60-64','86-90']);assert.deepEqual(tables[1].rows.at(-1),['XXL','108-112','96-100','110-114'])
  assert(tables.every(t=>t.rows.length===6));assert(post.content.includes('(Cotton Country)'))
})

const baseline=JSON.parse(fs.readFileSync(path.join(root,'docs/blog-2027/editorial-baseline-d610d0e.json')))
const dates=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-publication-dates.json'))).dates
const withoutLinks=text=>text.replace(/\[([^\]\n]+)\]\([^\s)]+\)/g,'$1')
test('all 53 original slugs and canonical paths survive and receive the exact owner-supplied date',()=>{
  assert.equal(blog.posts.length,53);assert.equal(new Set(blog.posts.map(p=>p.slug)).size,53)
  assert.deepEqual(new Set(blog.posts.map(p=>p.slug)),new Set(baseline.posts.map(p=>p.slug)))
  assert.deepEqual(new Set(Object.keys(dates)),new Set(blog.posts.map(p=>p.slug)))
  for(const post of blog.posts){assert.equal(post.publishedAt,dates[post.slug]);assert(publication.originalPublicationTime(post.publishedAt));assert.equal(post.canonicalPath,baseline.posts.find(p=>p.slug===post.slug).canonicalPath)}
})



test('metadata is unique and faithful to source excerpts; contextual and related article targets exist',()=>{
  assert.equal(new Set(blog.posts.map(p=>blog.postMetadata(p).title)).size,53)
  assert.equal(new Set(blog.posts.map(p=>blog.descriptionForPost(p))).size,53)
  const slugs=new Set(blog.posts.map(p=>'/'+p.slug))
  function links(nodes){return nodes.flatMap(n=>n.type==='link'?[n.href,...links(n.children)]:'children' in n?links(n.children):[])}
  for(const post of blog.posts){const meta=blog.postMetadata(post);assert(meta.description.length>0&&meta.description.length<=175)
    const found=content.parseContent(post.content).flatMap(b=>'children' in b?links(b.children):b.type==='list'?b.items.flatMap(links):[])
    for(const href of found.filter(href=>href.startsWith('/'))){const target=href.split(/[?#]/)[0];assert(slugs.has(target)||target==='/'||target.startsWith('/uniformes'),href)}
    const related=blog.relatedPosts(post);assert.equal(related.length,3);assert.equal(new Set(related.map(p=>p.slug)).size,3);assert(!related.some(p=>p.slug===post.slug))
  }
})
test('original dates drive listings, featured and category order; same-date ties remain stable',()=>{
  const sorted=blog.orderPostsByPublication(blog.posts)
  for(let i=1;i<sorted.length;i++)assert(sorted[i-1].publishedAt>=sorted[i].publishedAt)
  assert.equal(blog.featuredSlug,sorted[0].slug)
  for(const date of new Set(blog.posts.map(p=>p.publishedAt)))assert.deepEqual(sorted.filter(p=>p.publishedAt===date).map(p=>p.slug),blog.posts.filter(p=>p.publishedAt===date).map(p=>p.slug))
})
test('sitemap includes all 53 final canonical article URLs once with honest publication/revision dates',()=>{
  const map=load(path.join(root,'app/sitemap.ts')).default()
  for(const post of blog.posts){const rows=map.filter(item=>item.url==='https://cottoncountry.com.pe/'+post.slug);assert.equal(rows.length,1);assert.equal(rows[0].lastModified,post.updatedAt??post.publishedAt)}
})
test('the approved Guardapolvo photo is visible and the cotton photograph is not duplicated in the body',()=>{
  const post=blog.posts.find(p=>p.slug==='el-uniforme-de-farmacia'),image=blog.getPostImage(post.slug)
  assert.equal(image.src,'/prendas/guardapolvo-cotton-country.webp');assert.notEqual(image.visible,false);assert(!/bata/i.test(image.alt));assert(!/stock/i.test(post.content))
  assert.equal(content.parseContent(blog.posts.find(p=>p.slug==='dia-mundial-del-algodon-2026').content).filter(b=>b.type==='image').length,0)
  for(const before of baseline.posts.filter(p=>p.slug!=='el-uniforme-de-farmacia'))assert.deepEqual(blog.getPostImage(before.slug),baseline.images[before.slug])
})
test('contextual italic and link markup renders as safe semantic HTML',()=>{
  const {default:Content}=load(path.join(root,'components/blog/Content.tsx'))
  const html=renderToStaticMarkup(createElement(Content,{blocks:content.parseContent('Una tela *Oxford* y [su composición](/el-algodon-se-caso-con-el-poliester-en-oxford).')}))
  assert(html.includes('<em>Oxford</em>'));assert(html.includes('href="/el-algodon-se-caso-con-el-poliester-en-oxford"'))
})

test('blog Preview metadata is noindex without changing production indexability',()=>{
  const previous=process.env.VERCEL_ENV
  try{process.env.VERCEL_ENV='preview';assert.deepEqual(blog.blogRobots(),{index:false,follow:false});assert.deepEqual(blog.postMetadata(blog.posts[0]).robots,{index:false,follow:false});process.env.VERCEL_ENV='production';assert.equal(blog.blogRobots(),undefined);assert.equal(blog.postMetadata(blog.posts[0]).robots,undefined)}finally{if(previous===undefined)delete process.env.VERCEL_ENV;else process.env.VERCEL_ENV=previous}
})

test('the original Word witnesses match both complete measurement tables and the preserved interview quotations',()=>{
  const witnesses=JSON.parse(fs.readFileSync(path.join(root,'docs/blog-2027/word-witnesses.json')))
  const post=blog.posts.find(p=>p.slug==='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano')
  assert.equal(witnesses.numberOfSlugEntries,53)
  assert.deepEqual(content.parseContent(post.content).filter(b=>b.type==='table').map(t=>[t.headers,...t.rows]),witnesses.measurementTables)
  const interview=withoutLinks(blog.posts.find(p=>p.slug==='el-ano-del-algodon-2022').content)
  for(const quote of witnesses.vreelandQuotes)assert(interview.includes(quote),quote)
})

const approvedMigrationRedirects=[
  ['/confeccion-de-uniformes','/uniformes',308],
  ['/sizeset','https://sizeset.com/',308],
  ['/politica-de-privacidad','/privacidad',308],
  ['/terminos-y-condiciones','/terminos',308],
]
const approvedMigrationSources=new Set(approvedMigrationRedirects.flatMap(([source])=>[source,source+'/']))
test('the single Word alias and all existing blog aliases redirect directly without changing canonical slugs',async()=>{
  const alias='el-nino-2026-2027-impacto-industria-textil-peru',target='/el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil'
  assert.equal(paths.normalizeBlogHref('/'+alias),target);assert.equal(paths.normalizeBlogHref('/blog/'+alias+'/'),target)
  const rules=await load(path.join(root,'next.config.ts')).default.redirects()
  assert.equal(rules.length,119);assert.equal(new Set(rules.map(r=>r.source)).size,119)
  const historicalRules=rules.filter(r=>!approvedMigrationSources.has(r.source))
  assert.equal(historicalRules.length,111)
  for(const source of ['/'+alias,'/'+alias+'/','/blog/'+alias,'/blog/'+alias+'/']){const rule=rules.find(r=>r.source===source);assert.equal(rule.destination,target);assert.equal(rule.permanent,true)}
  for(const rule of historicalRules.filter(r=>!r.source.includes(':path')))assert(blog.posts.some(p=>'/'+p.slug===rule.destination))
})

test('the four remaining migration routes retain their exact redirects and Nosotros is no longer redirected',async()=>{
  const rules=await load(path.join(root,'next.config.ts')).default.redirects()
  for(const [source,destination,statusCode] of approvedMigrationRedirects){
    for(const variant of [source,source+'/']){
      const index=rules.findIndex(r=>r.source===variant)
      assert(index>=0&&index<8,variant+' must precede general normalization')
      assert.deepEqual(rules[index],{source:variant,destination,statusCode})
      assert(!approvedMigrationSources.has(destination),'No chains between new redirects')
    }
  }
  assert(!rules.some(r=>/^\/desarrollo-de-producto\/?$/.test(r.source)))
  assert(!rules.some(r=>/^\/nosotros\/?$/.test(r.source)))
  assert.equal(load(path.join(root,'app/sitemap.ts')).default().filter(item=>item.url==='https://cottoncountry.com.pe/nosotros').length,1)
})




import { sourceFromWord, verifyAll, verifyPost, publishedText } from '../scripts/blog_integrity.mjs'
const originalWord=sourceFromWord()
test('all 53 full texts, titles, original dates and slugs reproduce the actual versioned Word source',()=>{
  const result=verifyAll();assert.equal(result.restored,53);assert.equal(result.datesAndSlugs,53)
  assert(blog.posts.every(p=>p.updatedAt===undefined))
})
test('integrity rejects a deleted paragraph, an added sentence, substituted words and changed table figures',()=>{
  const source=originalWord.articles[0],post=blog.posts.find(p=>p.slug===source.slug)
  const cases=[post.content+'\nUna frase añadida.',post.content.replace('algodón','nylon'),post.content.split('\n\n').slice(1).join('\n\n')]
  for(const altered of cases)assert.throws(()=>verifyPost({...post,content:altered},source))
  const tableSource=originalWord.articles[38],tablePost=blog.posts.find(p=>p.slug===tableSource.slug)
  assert.throws(()=>verifyPost({...tablePost,content:tablePost.content.replace('80-84','81-84')},tableSource))
})
test('both original chats render without extra commentary, warnings or table captions and retain their closing text',()=>{
  const historical=load(path.join(root,'lib/blog/historical-chat.ts'))
  for(const [id,count] of [[37,2],[39,3]]){
    const original=originalWord.articles[id-1],post=blog.posts.find(p=>p.slug===original.slug)
    const source=historical.historicalChatSource(post.content),exchanges=historical.parseHistoricalChat(source,count)
    assert.equal(exchanges.length,count);assert.equal(publishedText(post,original),original.normalizedText)
    assert(!source.includes('Sin duda nos aterra'))
  }
  const view=fs.readFileSync(path.join(root,'components/blog/HistoricalChat.tsx'),'utf8')
  assert(!view.includes('tableNotice'));assert(!view.includes('<caption>'));assert(!view.includes('Reproducción de la conversación original'))
})

test('whitespace-only Word hyperlinks preserve spacing without creating unnamed focus targets',()=>{
  const nodes=content.parseInline('<a href="https://www.fao.org/"> </a><a href="https://www.fao.org/">FAOHome</a>')
  assert.equal(nodes.filter(n=>n.type==='link').length,1);assert.equal(content.inlineText(nodes),' FAOHome')
})
