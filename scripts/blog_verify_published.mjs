/* Requires a running production build, Playwright, Chromium and axe-core.
 * BLOG_TEST_ORIGIN=http://127.0.0.1:3150 node scripts/blog_verify_published.mjs [--write result.json]
 * Read-only: no site or browser actions submit forms or mutate remote data.
 */
import assert from 'node:assert/strict'
import fs from 'node:fs'
import {createRequire} from 'node:module'
const external=createRequire(import.meta.url),{chromium}=external('playwright'),axe=external('axe-core');
(async()=>{
 const {load,sourceFromWord,normalize,verifyAll}=await import('./blog_integrity.mjs');verifyAll();
 const blog=load('lib/blog/index.ts'),originals=sourceFromWord().articles;
 const posts=blog.posts.map((p,i)=>({id:i+1,...p,image:blog.getPostImage(p.slug),category:blog.categoryForPost(p),metadata:blog.postMetadata(p)}));
 const base=process.env.BLOG_TEST_ORIGIN??'http://127.0.0.1:3150';
 const categories=[...new Map(posts.map(p=>[p.category.slug,p.category])).values()],sorted=blog.orderPostsByPublication(posts);
 const lists=Array.from({length:5},(_,i)=>'/blog'+(i?'?pagina='+(i+1):''));
 for(const c of categories)for(let i=1;i<=Math.ceil(posts.filter(p=>p.category.slug===c.slug).length/12);i++)lists.push('/blog/categoria/'+c.slug+(i>1?'?pagina='+i:''));
 const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH??'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),api=page.request,seenLinks=new Set(),fragments=new Set(),errors=[],responsive=[];
 page.on('pageerror',e=>errors.push(e.message));let aliases=0,axeSamples=0;
 async function checkHttp(path,status=200,destination){const r=await api.get(base+path,{maxRedirects:0});assert.equal(r.status(),status,path);if(destination)assert.equal(new URL(r.headers().location,base).pathname,destination);return r}
 const xml=await(await checkHttp('/sitemap.xml')).text();
 for(const p of posts){assert.equal(xml.split('<loc>https://cottoncountry.com.pe/'+p.slug+'</loc>').length-1,1,p.slug);for(const path of ['/blog/'+p.slug,'/blog/'+p.slug+'/', '/'+p.slug+'/']){await checkHttp(path,308,'/'+p.slug);aliases++}await checkHttp(p.image.src)}
 for(const path of ['/blog?pagina=0','/blog?pagina=6','/blog?pagina=abc','/blog?pagina=1&pagina=2','/blog/categoria/no-existe','/blog/categoria/tallaje-y-dotaciones?pagina=2','/blog/no-existe','/no-existe'])await checkHttp(path,404);
 for(const path of ['/el-nino-2026-2027-impacto-industria-textil-peru','/el-nino-2026-2027-impacto-industria-textil-peru/','/blog/el-nino-2026-2027-impacto-industria-textil-peru','/blog/el-nino-2026-2027-impacto-industria-textil-peru/']){await checkHttp(path,308,'/el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil');aliases++}
 console.log('HTTP: 163 aliases, 53 images, sitemap and 8 negative controls passed.');
 const axeIds=new Set([11,14,19,23,24,25,28,29,32,35,37,39,44,46,48,49,50,51,52,53]);
 for(const width of [1440,768,390,320]){
  await page.setViewportSize({width,height:1000});let checked=0;
  for(const post of posts){
   assert.equal((await page.goto(base+'/'+post.slug)).status(),200);await page.evaluate(()=>document.fonts.ready);
   assert.equal(await page.locator('h1').count(),1);assert.equal(await page.locator('h1').innerText(),post.title);
   assert.equal(await page.title(),post.metadata.title);assert.equal(await page.locator('meta[name="description"]').getAttribute('content'),post.metadata.description);
   assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://cottoncountry.com.pe/'+post.slug);
   assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),'https://cottoncountry.com.pe/'+post.slug);
   assert.equal(await page.locator('header time').count(),1);assert.equal(await page.locator('header time').getAttribute('datetime'),post.publishedAt);
   const schema=await page.locator('script[type="application/ld+json"]').evaluateAll(els=>els.map(el=>JSON.parse(el.textContent)).flatMap(x=>x['@graph']??[x]).filter(x=>x['@type']==='BlogPosting'));
   assert.equal(schema.length,1);assert.equal(schema[0].datePublished,post.publishedAt);assert.equal(schema[0].dateModified,undefined);assert.equal(schema[0].url,'https://cottoncountry.com.pe/'+post.slug);
   const original=originals.find(p=>p.slug===post.slug),body=page.locator('[data-article-body]');
   const text=await page.evaluate(()=>{
    const body=document.querySelector('[data-article-body]').cloneNode(true);
    body.querySelectorAll('[data-layout-added-heading]').forEach(el=>el.remove());
    // innerText on a detached node omits layout separators; use textContent with explicit block boundaries.
    body.querySelectorAll('p,h2,h3,li,th,td').forEach(el=>el.append(document.createTextNode(' ')));
    return (document.querySelector('[data-article-lead]')?.innerText??'')+' '+body.textContent;
   });
   assert.deepEqual(await body.locator('[data-layout-added-heading]').allTextContents(),original.addedHeadings);
   assert(await body.locator('[data-layout-added-heading]').evaluateAll(els=>els.every(el=>['H2','H3'].includes(el.tagName))));
   assert.equal(normalize(text),original.normalizedText,'Published DOM integrity '+post.slug+' at '+width);
   const hierarchy=await body.locator('h2,h3').evaluateAll(els=>els.map(el=>el.tagName));let h2=false;for(const tag of hierarchy){if(tag==='H2')h2=true;else assert(h2,'H3 must follow an H2: '+post.slug)}
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),post.slug+' overflow at '+width);
   const photo=page.locator('main figure img').first();assert.equal(await photo.getAttribute('alt'),post.image.alt);await photo.evaluate(async img=>{img.loading='eager';await img.decode()});
   if(post.image.width<760)assert((await photo.boundingBox()).width<=post.image.width+1);
   if(width===1440){for(const href of await page.locator('main a[href]').evaluateAll(els=>els.map(el=>el.getAttribute('href')))){if(href.startsWith('/'))seenLinks.add(href);if(href.startsWith('#')){fragments.add(post.slug+href);assert.equal(await page.locator('[id="'+href.slice(1)+'"]').count(),1)}}}
   if((width===1440||width===390)&&axeIds.has(post.id)){await page.addScriptTag({content:axe.source});const violations=await page.evaluate(async()=>{const r=await axe.run(document.querySelector('main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))});assert.deepEqual(violations,[],post.slug+' axe '+width);axeSamples++}
   if(process.env.BLOG_SCREENSHOTS&&[11,32,37,39,47,51].includes(post.id)&&(width===1440||width===390)){await page.screenshot({path:process.env.BLOG_SCREENSHOTS+'/word-'+post.id+'-'+width+'.png'});if(await body.locator('h2').count()){await body.locator('h2').first().scrollIntoViewIfNeeded();await page.screenshot({path:process.env.BLOG_SCREENSHOTS+'/word-body-'+post.id+'-'+width+'.png'})}}
   checked++;
  }
  for(const path of lists){
   assert.equal((await page.goto(base+path)).status(),200);await page.evaluate(()=>document.fonts.ready);assert.equal(await page.locator('h1').count(),1);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),path+' overflow at '+width);
   const scope=path.startsWith('/blog/categoria/')?page.locator('section[aria-label^="Artículos de"]'):page.locator('#biblioteca');
   const actual=await scope.locator('article h3 a').evaluateAll(els=>els.map(el=>el.getAttribute('href'))),url=new URL(path,base),number=Number(url.searchParams.get('pagina')??1),category=path.startsWith('/blog/categoria/')?url.pathname.split('/').at(-1):null,items=category?sorted.filter(p=>p.category.slug===category):sorted;
   assert.deepEqual(actual,items.slice((number-1)*12,number*12).map(p=>'/'+p.slug));assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'),'https://cottoncountry.com.pe'+path);
  }
  responsive.push({width,articles:checked,listings:lists.length,DOMIntegrity:checked,overflow:false});console.log('Responsive '+width+': 53 original texts and '+lists.length+' listings passed.');
 }
 for(const href of seenLinks){const url=new URL(href,base);await checkHttp(url.pathname+url.search);if(url.hash){await page.goto(base+url.pathname+url.search);assert.equal(await page.locator('[id="'+url.hash.slice(1)+'"]').count(),1)}}
 await page.setViewportSize({width:320,height:1000});await page.goto(base+'/una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano');
 assert.equal(await page.locator('table').count(),2);for(const table of await page.getByRole('region',{name:/Tabla de medidas para/}).all()){assert.equal(await table.locator('tbody tr').count(),6);await table.focus();assert(await table.evaluate(el=>el.scrollWidth>el.clientWidth));await page.keyboard.press('ArrowRight')}
 const context=await browser.newContext({javaScriptEnabled:false}),staticPage=await context.newPage();for(const [slug,count] of [['una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano',6],['las-tallas-completas-segun-una-ia',4]]){await staticPage.goto(base+'/'+slug);assert.equal(await staticPage.locator('[data-speaker]').count(),count)}await context.close();assert.deepEqual(errors,[]);
 const result={articles:53,canonicalURLs:53,aliases,negativeControls:8,localImageURLs:new Set(posts.map(p=>p.image.src)).size,internalDestinations:seenLinks.size,verifiedTOCFragments:fragments.size,responsive,axeSamples,errors,limitations:['This checks a local production build; external sites, Vercel availability and Google indexing are separate.']};
 const index=process.argv.indexOf('--write');if(index>=0)fs.writeFileSync(process.argv[index+1],JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
 } finally {await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
