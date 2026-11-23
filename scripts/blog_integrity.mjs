import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import ts from 'typescript'

export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..')
const require=createRequire(import.meta.url), cache=new Map()
export function load(relative){
  const file=path.resolve(root,relative)
  if(cache.has(file))return cache.get(file).exports
  const mod={exports:{}};cache.set(file,mod)
  const localRequire=name=>{
    if(name.endsWith('.css'))return new Proxy({},{get:(_,key)=>String(key)})
    if(!name.startsWith('.')&&!name.startsWith('@/'))return require(name)
    const base=name.startsWith('@/')?path.join(root,name.slice(2)):path.resolve(path.dirname(file),name)
    const target=[base+'.ts',base+'.tsx',path.join(base,'index.ts')].find(fs.existsSync)
    if(!target)throw Error('Missing module '+name)
    return load(target)
  }
  const compiled=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText
  new Function('require','module','exports',compiled)(localRequire,mod,mod.exports)
  return mod.exports
}
export const normalize=text=>text.normalize('NFC').replace(/\s+/gu,' ').trim()
export function sourceFromWord(){
  return JSON.parse(execFileSync('python3',['-B',path.join(root,'scripts/blog_word_source.py')],{encoding:'utf8',maxBuffer:10*1024*1024}))
}
export function publishedText(post,original){
  const {parseContent,inlineText}=load('lib/blog/content.ts')
  const remaining=new Set(original.addedHeadings)
  const text=parseContent(post.content).flatMap(block=>{
    if(block.type==='heading'&&remaining.has(inlineText(block.children))){remaining.delete(inlineText(block.children));return []}
    if('children' in block)return [inlineText(block.children)]
    if(block.type==='list')return block.items.map(inlineText)
    if(block.type==='table')return [...block.headers,...block.rows.flat()]
    return []
  }).join(' ')
  assert.equal(remaining.size,0,'Missing declared presentation heading: '+post.slug)
  return normalize(text)
}
export function verifyPost(post,original){
  assert.equal(post.title,original.title,'Original H1: '+post.slug)
  assert.equal(publishedText(post,original),original.normalizedText,'Word text integrity: '+post.slug)
  return crypto.createHash('sha256').update(original.normalizedText).digest('hex')
}
export function verifyAll(){
  const source=sourceFromWord(),fixture=JSON.parse(fs.readFileSync(path.join(root,'docs/blog-2027/word-source.json'),'utf8'))
  assert.deepEqual(source,fixture,'The stored transcription must be reproducible from the actual DOCX')
  const {posts}=load('app/blog/posts.ts'),dates=JSON.parse(fs.readFileSync(path.join(root,'tests/fixtures/blog-publication-dates.json'),'utf8')).dates
  const originalPosts=posts.filter(post=>Object.hasOwn(dates,post.slug))
  assert.equal(originalPosts.length,53);assert.equal(source.articles.length,53)
  assert.deepEqual(new Set(originalPosts.map(p=>p.slug)),new Set(Object.keys(dates)))
  const articles=source.articles.map(original=>{
    const post=posts.find(p=>p.slug===original.slug);assert(post,original.slug)
    assert.equal(post.publishedAt,dates[post.slug]);assert.equal(post.canonicalPath,'/'+post.slug)
    assert.equal(post.updatedAt,undefined,'A technical restoration is not an editorial revision')
    const sha256=verifyPost(post,original)
    return {id:original.id,slug:post.slug,publishedAt:post.publishedAt,originalTitle:true,integrity:true,normalizedTextSHA256:sha256}
  })
  return {source:source.sourceFile,sourceSHA256:source.sha256,restored:articles.length,datesAndSlugs:53,comparison:'NFC and whitespace only; inline presentation and exactly declared added headings excluded',articles}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){
  const result=verifyAll(),index=process.argv.indexOf('--write')
  if(index>=0)fs.writeFileSync(process.argv[index+1],JSON.stringify(result,null,2)+'\n')
  console.log(JSON.stringify({restored:result.restored,datesAndSlugs:result.datesAndSlugs,sourceSHA256:result.sourceSHA256}))
}
