import {test} from 'node:test'
import assert from 'node:assert/strict'
import {load} from '../scripts/blog_integrity.mjs'
const {posts}=load('app/blog/posts.ts')
const {supplementaryReading}=load('lib/blog/reading-links.ts')

test('supplemental navigation targets real new articles without self-links, duplicates or reciprocal link schemes',()=>{
  let links=0
  for(const post of posts){
    const slugs=supplementaryReading(post.slug)
    assert(slugs.length<=2)
    assert.equal(new Set(slugs).size,slugs.length)
    for(const slug of slugs){
      assert.notEqual(slug,post.slug)
      assert(posts.some(p=>p.slug===slug&&p.editorialNumber>=54))
      assert(!supplementaryReading(slug).includes(post.slug))
      links++
    }
  }
  assert.equal(links,8)
})
