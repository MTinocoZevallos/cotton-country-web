import {test} from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import crypto from 'node:crypto'
import {createElement} from 'react'
import {renderToStaticMarkup} from 'react-dom/server'
import {load,normalize} from '../scripts/blog_integrity.mjs'
const blog=load('lib/blog/index.ts'),content=load('lib/blog/content.ts')
const approved=JSON.parse(fs.readFileSync(new URL('./fixtures/blog-54-57-approved.json',import.meta.url)))
const baseline=JSON.parse(fs.readFileSync(new URL('./fixtures/blog-before-54-57.json',import.meta.url)))
const prose=text=>normalize(text.split('\n').map(line=>line.replace(/^#{1,3}\s+/,'').replace(/^\d+[.)]\s+/,'').replace(/^[-*]\s+/,'')).join(' '))

test('the original 53 complete records, approved images and related recommendations remain identical',()=>{
  for(const [slug,old]of Object.entries(baseline.posts)){
    const post=blog.posts.find(p=>p.slug===slug);assert(post)
    assert.equal(crypto.createHash('sha256').update(JSON.stringify(post)).digest('hex'),old.sha256,slug)
    assert.deepEqual(blog.getPostImage(slug),old.image)
    assert.deepEqual(blog.relatedPosts(post).map(p=>p.slug),old.related)
  }
})
test('four new articles retain every approved word, title and slug and have no invented publication dates',()=>{
  assert.equal(blog.posts.length,57);assert.equal(new Set(blog.posts.map(p=>p.slug)).size,57)
  for(const source of approved){const post=blog.posts.find(p=>p.slug===source.slug);assert(post)
    assert.equal(post.title,source.title);assert.equal(post.editorialNumber,source.number)
    assert.equal(prose(post.content),prose(source.approvedText),source.slug)
    assert.equal(post.canonicalPath,'/'+source.slug);assert.equal(post.publishedAt,undefined);assert.equal(post.updatedAt,undefined)
    assert(!post.content.includes('INSERTAR AQUÍ'));assert(!post.content.includes('Ver especificaciones'))
    assert(blog.categoryForPost(post));assert(blog.postMetadata(post).description.length>0)
  }
})
test('article 55 renders both approved tables with their exact values and reference caveat',()=>{
  const post=blog.posts.find(p=>p.editorialNumber===55)
  const blocks=content.parseContent(post.content,{markdownTables:true}),tables=blocks.filter(b=>b.type==='table')
  assert.deepEqual(tables,[
    {type:'table',headers:['Encogimiento','Centímetros que pierde','Largo final'],rows:[['1 %','0,7 cm','69,3 cm'],['2 %','1,4 cm','68,6 cm'],['3 %','2,1 cm','67,9 cm'],['5 %','3,5 cm','66,5 cm']]},
    {type:'table',headers:['Tipo de tejido','Cambio dimensional de referencia'],rows:[['Tejidos planos de algodón y determinadas mezclas','±3 %'],['Tejidos de punto','±4 %'],['Algunas construcciones de interlock','±5 %']]},
  ])
  assert(blocks.some(b=>b.type==='paragraph'&&content.inlineText(b.children).includes('no límites legales universales ni tolerancias obligatorias')))
  const {default:Content}=load('components/blog/Content.tsx')
  const html=renderToStaticMarkup(createElement(Content,{blocks,editorialTables:true}))
  assert.equal((html.match(/<table>/g)||[]).length,2)
  assert.equal((html.match(/scope="col"/g)||[]).length,5)
  assert.equal((html.match(/scope="row"/g)||[]).length,7)
  for(const href of ['/como-definir-un-proyecto-de-uniformes-corporativos','/por-que-destinen-los-uniformes'])assert(html.includes('href="'+href+'"'))
})
test('Markdown table support is opt-in and does not reinterpret existing articles',()=>{
  const markdown='| A | B |\n|---|---|\n| Uno | Dos |'
  assert.equal(content.parseContent(markdown).filter(b=>b.type==='table').length,0)
  assert.equal(content.parseContent(markdown,{markdownTables:true}).filter(b=>b.type==='table').length,1)
})
test('article 56 retains the opening anecdote, four-row colorfastness table and both approved links',()=>{
  const post=blog.posts.find(p=>p.editorialNumber===56)
  assert(post.content.trim().startsWith('Imagina que una empresa entrega pantalones grises a todos sus vendedores.'))
  const blocks=content.parseContent(post.content,{markdownTables:true}),tables=blocks.filter(b=>b.type==='table')
  assert.deepEqual(tables,[{type:'table',headers:['Tipo de solidez','¿Qué permite evaluar?'],rows:[
    ['Al lavado','Si la tela pierde color o transfiere tinte al lavarse'],
    ['Al frote','Si el color se transfiere al rozar otra superficie'],
    ['A la luz','Si la exposición luminosa altera el color'],
    ['Al sudor','Cómo se comporta el color frente a la transpiración'],
  ]}])
  const {default:Content}=load('components/blog/Content.tsx')
  const html=renderToStaticMarkup(createElement(Content,{blocks,editorialTables:true}))
  assert.equal((html.match(/<table>/g)||[]).length,1)
  assert.equal((html.match(/scope="col"/g)||[]).length,2)
  assert.equal((html.match(/scope="row"/g)||[]).length,4)
  for(const href of ['/como-definir-un-proyecto-de-uniformes-corporativos','/por-que-encogen-las-telas'])assert(html.includes('href="'+href+'"'))
})
test('articles 54–56 use their approved lossless WebP images in covers and social metadata',()=>{
  const files=[
    ['que-significa-algodon-24-1-30-1.webp','ebc50b48fa07f2a30f6ce906d1ae722b15af025904ff5135e9933a94ec2f3d0c'],
    ['por-que-encogen-las-telas.webp','e3099335679432ad3eedc7075a7547a44eacdbd453807d10b5dca9bffc189c19'],
    ['por-que-destinen-los-uniformes.webp','38da80254056886895d763e01a97ce1cb87eba048bd361ff7198b950414e9d41'],
  ]
  for(const [index,source]of approved.slice(0,3).entries()){
    const image=blog.getPostImage(source.slug),[file,hash]=files[index]
    assert.equal(image.pendingApproval,undefined);assert.notEqual(image.visible,false)
    assert.equal(image.src,'/blog/'+file);assert(image.alt.length>20)
    assert.equal(crypto.createHash('sha256').update(fs.readFileSync(new URL('../public/blog/'+file,import.meta.url))).digest('hex'),hash)
    const meta=blog.postMetadata(blog.posts.find(p=>p.slug===source.slug))
    assert.equal(new URL(meta.openGraph.images[0].url).pathname,image.src)
    assert.equal(meta.twitter.images[0].url,meta.openGraph.images[0].url)
    assert.equal(blog.postStructuredData(blog.posts.find(p=>p.slug===source.slug))['@graph'][0].image.url,'https://cottoncountry.com.pe'+image.src)
  }
})
test('article 57 inserts exactly three accessible technical tables at the approved boundaries',()=>{
  const {default:Technical}=load('components/blog/HighVisibilityContent.tsx')
  const post=blog.posts.find(p=>p.editorialNumber===57)
  const html=renderToStaticMarkup(createElement(Technical,{blocks:content.parseContent(post.content).slice(1)}))
  assert.equal((html.match(/<table>/g)||[]).length,3);assert.equal((html.match(/<caption /g)||[]).length,3)
  assert.equal((html.match(/role="region"/g)||[]).length,3);assert.equal((html.match(/tabindex="0"/g)||[]).length,3)
  for(const scope of ['scope="col"','scope="row"'])assert(html.includes(scope))
  for(const value of ['0,14 m²','0,10 m²','0,50 m²','0,13 m²','0,80 m²','0,20 m²'])assert.equal(html.split(value).length-1,1)
  assert(html.indexOf('Cuadro 1')<html.indexOf('¿Qué significan las clases 1, 2 y 3?'))
  assert(html.indexOf('Cuadro 3')<html.indexOf('¿Qué significan las clases 1, 2 y 3?'))
  assert(html.indexOf('Cuadro 2')>html.indexOf('Clase 3: establece'))
  assert(html.indexOf('Cuadro 2')<html.indexOf('Pero hay una precisión importante:'))
  assert(html.includes('no son automáticamente equivalentes'))
  assert(html.includes('No atribuir clase por superficie únicamente'))
})
test('three editable original SVG sheets have correct dimensions and do not certify illustrative garments',async()=>{
  const sharp=(await import('sharp')).default
  for(const [name,width,height]of [['clases-iso',1200,600],['tipos-ansi',1200,600],['prendas-vistas',1000,1560]]){
    const path=new URL('../public/blog/alta-visibilidad/'+name+'.svg',import.meta.url),svg=fs.readFileSync(path,'utf8'),actual=await sharp(fs.readFileSync(path)).metadata()
    assert.equal(actual.width,width);assert.equal(actual.height,height);assert(svg.includes('<title'));assert(svg.includes('<desc'))
    assert(!svg.includes('3M'));assert(!svg.includes('<image'));assert(!svg.includes('<script'))
    if(name==='prendas-vistas'){assert.equal((svg.match(/>Anterior</g)||[]).length,6);assert.equal((svg.match(/>Posterior</g)||[]).length,6);assert(!/Clase [123]/.test(svg));assert(svg.includes('sin escala'))}
  }
})
