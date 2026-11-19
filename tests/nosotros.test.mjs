import {test} from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createRequire} from 'node:module'
import ts from 'typescript'

const require=createRequire(import.meta.url)
function metadataFor(environment){
  const source=fs.readFileSync(new URL('../app/nosotros/page.tsx',import.meta.url),'utf8')
  const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText
  const mod={exports:{}}
  const localRequire=name=>{
    if(name==='@/lib/social'){
      const social={exports:{}}
      const code=ts.transpileModule(fs.readFileSync(new URL('../lib/social.ts',import.meta.url),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText
      new Function('module','exports','process',code)(social,social.exports,{env:{VERCEL_ENV:environment}})
      return social.exports
    }
    return name.endsWith('.css')?{default:{}}:name==='@/components/home-font'?{editorialSerif:{variable:'local-font'}}:require(name)
  }
  new Function('require','module','exports','process',compiled)(localRequire,mod,mod.exports,{env:{VERCEL_ENV:environment}})
  return mod.exports.metadata
}

test('Nosotros retains the definitive canonical and excludes Preview without noindex in Production',()=>{
  for(const environment of ['production','preview']){
    const metadata=metadataFor(environment)
    assert.equal(metadata.alternates.canonical,'https://cottoncountry.com.pe/nosotros')
    assert.equal(metadata.openGraph.url,metadata.alternates.canonical)
    assert.equal(metadata.title,metadata.openGraph.title)
    assert.equal(metadata.description,metadata.openGraph.description)
    assert.equal(metadata.openGraph.images.length,1)
    assert.equal(metadata.openGraph.images[0].url,'https://cottoncountry.com.pe/social/cotton-country.png')
    assert.equal(metadata.twitter.card,'summary_large_image')
    assert.equal(metadata.twitter.title,metadata.title)
    assert.deepEqual(metadata.twitter.images,metadata.openGraph.images)
    assert(metadata.description.length>0)
    assert.deepEqual(metadata.robots,environment==='preview'?{index:false,follow:false}:undefined)
  }
})
