import { test } from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
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
test('five approved versions keep their exact wording and SEO titles; only contextual links are added',()=>{
  for(const slug of baseline.protectedSlugs){const before=baseline.posts.find(p=>p.slug===slug),post=blog.posts.find(p=>p.slug===slug);assert.equal(withoutLinks(post.content),withoutLinks(before.content),slug);assert.equal(post.title,before.title);assert.equal(post.seoTitle,before.seoTitle);assert.equal(post.excerpt,before.excerpt);assert.equal(post.updatedAt,before.updatedAt)}
})
test('both historical AI conversations and every original measurement cell stay verbatim',()=>{
  const historical=load(path.join(root,'lib/blog/historical-chat.ts'))
  const tableSlug='una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano',fullSlug='las-tallas-completas-segun-una-ia'
  const original=fs.readFileSync(path.join(root,'tests/fixtures/chatgpt-conversation-original.txt'),'utf8').trim()
  assert.equal(historical.historicalChatSource(blog.posts.find(p=>p.slug===tableSlug).content),original)
  const post=blog.posts.find(p=>p.slug===fullSlug),before=baseline.posts.find(p=>p.slug===fullSlug)
  assert.deepEqual(historical.parseFullSizeChat(post.content),historical.parseFullSizeChat(before.content))
  assert.deepEqual(content.parseContent(blog.posts.find(p=>p.slug===tableSlug).content).filter(b=>b.type==='table'),content.parseContent(original).filter(b=>b.type==='table'))
  const interview=blog.posts.find(p=>p.slug==='el-ano-del-algodon-2022')
  for(const sentence of ['En el año 1922 el hacendado Piurano don Emilio Hilck Seminario','¿Pero sabe usted que este algodón se originó en los EEUU?'])assert(interview.content.includes(sentence))
})
test('the 30 percent claim remains a first-party history and is not moved into the commercial comparison',()=>{
  const post=blog.posts.find(p=>p.slug==='el-problema-de-las-tallas'),guide=blog.posts.find(p=>p.slug==='uniformes-a-medida-o-por-tallas-descubre-la-opcion-mas-practica-y-conveniente')
  assert(post.content.includes('30 %'));assert(post.content.includes('En nuestra experiencia inicial, los reclamos'));assert(post.content.includes('arreglos posteriores'))
  assert(!guide.content.includes('30 %'));assert(!post.content.includes('reciclaje'));assert(!post.content.includes('Zara'))
  assert(!blog.posts.find(p=>p.slug==='como-definir-un-proyecto-de-uniformes-corporativos').content.includes('Standard Allowed Minutes'))
  assert(blog.posts.find(p=>p.slug==='de-que-depende-el-tiempo-de-entrega-de-uniformes').content.includes('Standard Allowed Minutes'))
})
test('every article has contextual links and unique useful metadata; related articles exist and never link to themselves',()=>{
  assert.equal(new Set(blog.posts.map(p=>blog.postMetadata(p).title)).size,53)
  assert.equal(new Set(blog.posts.map(p=>blog.descriptionForPost(p))).size,53)
  const slugs=new Set(blog.posts.map(p=>'/'+p.slug))
  function links(nodes){return nodes.flatMap(n=>n.type==='link'?[n.href,...links(n.children)]:'children' in n?links(n.children):[])}
  for(const post of blog.posts){const meta=blog.postMetadata(post);assert(meta.description.length>=80&&meta.description.length<=175);assert(!meta.description.endsWith('…'));assert(content.parseContent(post.content).some(b=>b.type==='heading'))
    const found=content.parseContent(post.content).flatMap(b=>'children' in b?links(b.children):b.type==='list'?b.items.flatMap(links):[])
    assert(found.some(href=>slugs.has(href.split(/[?#]/)[0])),post.slug)
    for(const href of found.filter(href=>href.startsWith('/'))){const target=href.split(/[?#]/)[0];assert(slugs.has(target)||target.startsWith('/uniformes'),href)}
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

test('the single Word alias and all existing blog aliases redirect directly without changing canonical slugs',async()=>{
  const alias='el-nino-2026-2027-impacto-industria-textil-peru',target='/el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil'
  assert.equal(paths.normalizeBlogHref('/'+alias),target);assert.equal(paths.normalizeBlogHref('/blog/'+alias+'/'),target)
  const rules=await load(path.join(root,'next.config.ts')).default.redirects()
  assert.equal(rules.length,111);assert.equal(new Set(rules.map(r=>r.source)).size,111)
  for(const source of ['/'+alias,'/'+alias+'/','/blog/'+alias,'/blog/'+alias+'/']){const rule=rules.find(r=>r.source===source);assert.equal(rule.destination,target);assert.equal(rule.permanent,true)}
  for(const rule of rules.filter(r=>!r.source.includes(':path')))assert(blog.posts.some(p=>'/'+p.slug===rule.destination))
})

const sizingReview=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/sizing-editorial-review.json')))
const reviewDigest=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex')
test('all reviewed sizing articles read as publications without internal revision commentary',()=>{
  const banned=/el (?:relato|texto|artículo) original|el artículo anterior decía|la versión histórica no documentaba|no se publicó el tamaño de muestra|no publicaba su definición|no corresponde convertir|según la auditoría|este artículo (?:se concentra|documenta)|esta publicación se concentra|el aporte (?:histórico|específico)|sin añadir porcentajes de acierto|no fueron publicados|no fueron documentados/i
  assert.equal(sizingReview.reviewedSlugs.length,14)
  for(const slug of sizingReview.reviewedSlugs){const post=blog.posts.find(p=>p.slug===slug);assert(!banned.test(post.content),slug)}
})
test('this sizing correction changes only seven bodies and preserves all 53 SEO records and images',()=>{
  assert.equal(sizingReview.modifiedSlugs.length,7);assert.equal(sizingReview.posts.length,53)
  for(const before of sizingReview.posts){const post=blog.posts.find(p=>p.slug===before.slug);assert.equal(reviewDigest(Object.fromEntries(Object.entries(post).filter(([k])=>k!=='content'))),before.nonContentSHA256,post.slug);assert.equal(reviewDigest(blog.postMetadata(post)),before.metadataSHA256,post.slug);assert.deepEqual(blog.getPostImage(post.slug),before.image)
    if(!sizingReview.modifiedSlugs.includes(post.slug))assert.equal(reviewDigest(post),before.recordSHA256,post.slug)
  }
})
test('recovered sizing testimony stays first-party and historical, without invented platform metrics',()=>{
  const peruvian=blog.posts.find(p=>p.slug==='tallas-completas-en-peru'),online=blog.posts.find(p=>p.slug==='guia-de-tallas-online'),company=blog.posts.find(p=>p.slug==='el-problema-de-las-tallas'),campaign=blog.posts.find(p=>p.slug==='por-que-las-empresas-tienen-problemas-con-las-tallas')
  assert(peruvian.content.includes('2022'));assert(peruvian.content.includes('Durante nuestras sesiones de SizeSet observábamos hasta cuatro grupos'));assert(!/\d+\s*%/.test(peruvian.content));assert(!/SaaS|muestra poblacional|clasificación nacional/i.test(peruvian.content))
  for(const text of ['supervisión presencial','camisa de cuello americano','oficinas, locales o plantas'])assert(online.content.includes(text))
  for(const text of ['30 %','ciclo del efectivo','2014','2021','smartphone','arreglos posteriores'])assert(company.content.includes(text))
  assert(campaign.content.includes('cientos de procesos de tallaje'));assert(campaign.content.includes('Personas que envían a un compañero en su lugar'))
})
