import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import {createRequire} from 'node:module'
import {load,root} from './blog_integrity.mjs'
const require=createRequire(import.meta.url),sharp=require('sharp')
const blog=load('lib/blog/index.ts'),{parseContent,inlineText}=load('lib/blog/content.ts'),{supplementaryReading}=load('lib/blog/reading-links.ts')
const out=path.join(root,'docs/blog-publication');fs.mkdirSync(out,{recursive:true})
const csv=(name,rows)=>{const keys=Object.keys(rows[0]);fs.writeFileSync(path.join(out,name),[keys,...rows.map(r=>keys.map(k=>r[k]??''))].map(row=>row.map(x=>'"'+String(x).replaceAll('"','""')+'"').join(',')).join('\n')+'\n')}
const connections={
'una-breve-historia-del-algodon':['que-significa-algodon-24-1-30-1'],
'el-algodon-se-caso-con-el-poliester-en-oxford':['que-significa-algodon-24-1-30-1','por-que-destinen-los-uniformes'],
'3-consejos-para-compradores-de-textiles-b2b':['por-que-encogen-las-telas','por-que-destinen-los-uniformes'],
'como-definir-un-proyecto-de-uniformes-corporativos':['por-que-encogen-las-telas','por-que-destinen-los-uniformes'],
'que-caracteristicas-deben-tener-los-uniformes-de-seguridad-industrial':['ubicacion-cintas-reflectivas-uniformes'],
'materiales-textiles-inteligentes-segun-el-tipo-de-uniformes':['ubicacion-cintas-reflectivas-uniformes']}
const links=[],historical=[],images=[],metadata=[]
for(const post of blog.posts){
 const blocks=parseContent(post.content,{markdownTables:[55,56].includes(post.editorialNumber)}),body=[]
 const visit=nodes=>{for(const n of nodes){if(n.type==='link')body.push({href:n.href,label:inlineText(n.children)});if(n.children)visit(n.children)}}
 for(const b of blocks){if(b.children)visit(b.children);if(b.items)b.items.forEach(visit)}
 for(const l of body)links.push({origen:'/'+post.slug,tipo:'Cuerpo aprobado; conservado',destino:l.href,texto:l.label})
 for(const p of blog.relatedPosts(post))links.push({origen:'/'+post.slug,tipo:'Lecturas relacionadas existentes; conservadas',destino:'/'+p.slug,texto:p.title})
 for(const slug of supplementaryReading(post.slug))links.push({origen:'/'+post.slug,tipo:'Navegación complementaria implementada fuera del cuerpo',destino:'/'+slug,texto:blog.posts.find(p=>p.slug===slug).title})
 const image=blog.getPostImage(post.slug),file=path.join(root,'public',image.src),m=await sharp(file).metadata(),bytes=fs.statSync(file).size
 assert.equal(m.width,image.width,post.slug);assert.equal(m.height,image.height,post.slug)
 if(post.publishedAt>='2025-01-01'||post.editorialNumber){
  const ratio=Number((m.width/m.height).toFixed(4)),is169=Math.abs(ratio-16/9)<.01
  let crop=is169?'Ya próxima a 16:9; conservar encuadre.':'Requiere revisión visual individual; no recortar automáticamente.'
  if(post.slug==='dia-mundial-del-algodon-2026')crop='Conservar 1:1: muestras y fibras próximas a bordes; 16:9 pierde información.'
  if(post.slug==='como-definir-un-proyecto-de-uniformes-corporativos')crop='Conservar 3:2: manos y portapapeles próximos al borde inferior.'
  if(post.slug==='por-que-las-empresas-tienen-problemas-con-las-tallas')crop='Posible 16:9 con encuadre manual hacia las cintas de la zona inferior; aprobación previa.'
  if(post.slug==='de-que-depende-el-tiempo-de-entrega-de-uniformes')crop='Posible 16:9 reduciendo fondo superior, previa aprobación; cintas en zona inferior.'
  if(post.editorialNumber===57)crop='Gráfico técnico vertical 1000×1560: conservar completo, sin recortes ni adaptación 16:9.'
  images.push({articulo:post.title,slug:post.slug,fecha:post.publishedAt??'No proporcionada; no inventada',archivo:image.src,formato:m.format,ancho:m.width,alto:m.height,proporcion:ratio,bytes,visible:image.visible!==false,adaptacion_16_9:crop,recomendacion:post.editorialNumber?'Conservar bytes aprobados; excepción documentada al estándar futuro.':m.width>2000?'Optimizar resolución de origen en revisión futura, con aprobación; Next ya ofrece variantes responsive.':m.format!=='webp'?'Evaluar conversión WebP en futura revisión; conservar ahora.':'Conservar; evaluar compresión visual individual en futura revisión.'})
 }
 const meta=blog.postMetadata(post),schema=blog.postStructuredData(post)
 metadata.push({slug:post.slug,title:post.title,fecha:post.publishedAt??null,categoria:blog.categoryForPost(post).name,canonical:meta.alternates.canonical,og:meta.openGraph.images[0].url,alt:image.alt,headings:blocks.filter(b=>b.type==='heading').map(b=>b.id),schema})
 if(!post.editorialNumber)historical.push({titulo:post.title,slug:post.slug,fecha:post.publishedAt,categoria:blog.categoryForPost(post).name,imagen:image.src,formato:m.format,dimensiones:`${m.width}×${m.height}`,bytes,estado_imagen:image.visible===false?'No visible por decisión previa; conservar':'Presente; dimensiones verificadas',enlaces_internos:body.filter(l=>l.href.startsWith('/')).map(l=>l.href).join(' | '),lecturas_relacionadas:blog.relatedPosts(post).map(p=>'/'+p.slug).join(' | '),oportunidades:(connections[post.slug]??[]).map(s=>'/'+s).join(' | '),formato:blocks.some(b=>b.type==='heading')?'Encabezados detectados; revisar individualmente sin reescritura.':'Sin encabezados detectados; posible revisión editorial futura.',revision_futura:'Conservar texto, fecha e imagen. Priorizar con datos reales de Search Console; no disponibles en esta tarea.'})
}
const opportunities=[]
for(const [slug,targets]of Object.entries(connections))for(const target of targets)opportunities.push({origen:'/'+slug,destino:'/'+target,motivo:target.includes('reflectivas')?'Seguridad industrial, materiales y visibilidad.':target.includes('algodon')?'Fibra de algodón, tejido y selección de materiales.':'Evaluación de materiales, estabilidad dimensional o color en compras textiles.',estado:'Inserción en cuerpo pendiente de revisión editorial individual; NO implementada.'})
for(const [origin,target,reason]of [['/uniformes/polos','/que-significa-algodon-24-1-30-1','Tejidos y polos; revisar ubicación editorial.'],['/uniformes/chalecos','/ubicacion-cintas-reflectivas-uniformes','Prendas de trabajo y material reflectivo; no atribuir certificaciones.'],['/uniformes','/por-que-encogen-las-telas','Criterios de compra y estabilidad dimensional.'],['/','/blog?pagina=5#biblioteca','Los cuatro artículos son accesibles en la biblioteca; no cambiar Home.']])opportunities.push({origen:origin,destino:target,motivo:reason,estado:'Página relevante inventariada; sin modificar. Ubicación pendiente de aprobación.'})
assert.equal(historical.length,53);assert.equal(metadata.length,57)
csv('enlaces-57.csv',links);csv('oportunidades-pendientes.csv',opportunities);csv('inventario-editorial-53.csv',historical);csv('imagenes-desde-2025.csv',images.filter(i=>i.fecha!=='No proporcionada; no inventada'));csv('imagenes-aprobadas-54-57.csv',images.filter(i=>i.fecha==='No proporcionada; no inventada'))
fs.writeFileSync(path.join(out,'metadatos-57.json'),JSON.stringify(metadata,null,2)+'\n')
console.log(JSON.stringify({posts:metadata.length,historicos:historical.length,imagenesDesde2025:images.filter(i=>i.fecha!=='No proporcionada; no inventada').length,enlaces:links.length,complementarios:links.filter(l=>l.tipo.startsWith('Navegación')).length,oportunidades:opportunities.length}))
