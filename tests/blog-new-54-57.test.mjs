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
test('articles 54–56 use their exact approved PNG originals in covers and social metadata',()=>{
  const files=[
    ['blog-54-algodon-24-1-30-1.png','29d9d5ede6424dbf46123341a422e8b4bff73eda5cc9a8da36b7e6e5692a0868'],
    ['blog-55-encogimiento-telas.png','5b65dae3649c2dfda62ad5b5e2d2e9521f872bab477fd97b001a4aeed12cdb83'],
    ['blog-56-solidez-color.png','b7c56b9b1b9c2718a3546a449a34b99cea028dd4b8d15672db6f2c63e1c1f0c2'],
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
