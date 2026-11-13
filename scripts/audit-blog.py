#!/usr/bin/env python3
"""Audit the built blog over HTTP; no third-party Python dependencies.
Run after npm run build / npm run start. It never submits forms.
"""
import argparse, concurrent.futures, csv, json, re, urllib.error, urllib.parse, urllib.request
from collections import deque
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

ROOT=Path(__file__).resolve().parents[1]
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args,**kwargs): return None
OPENER=urllib.request.build_opener(NoRedirect)
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__(convert_charrefs=True)
  self.links=[];self.images=[];self.canonical=[];self.meta={};self.ids=set();self.schemas=[];self.h1=0;self._schema=None
  self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if a.get('id'):self.ids.add(a['id'])
  if tag=='a' and a.get('href'):self.links.append(a['href'])
  if tag=='img':self.images.append(a)
  if tag=='link' and a.get('rel')=='canonical':self.canonical.append(a.get('href'))
  if tag=='meta':self.meta[a.get('name') or a.get('property')]=a.get('content','')
  if tag=='h1':self.h1+=1
  if tag=='script' and a.get('type')=='application/ld+json':self._schema=''
 def handle_data(self,text):
  if self._schema is not None:self._schema+=text
 def handle_endtag(self,tag):
  if tag=='script' and self._schema is not None:
   try:self.schemas.append(json.loads(self._schema))
   except ValueError:self.schemas.append({'invalid':True})
   self._schema=None

def main():
 parser=argparse.ArgumentParser();parser.add_argument('--base-url',default='http://127.0.0.1:3118');parser.add_argument('--inventory',default='docs/blog-2027/inventario-53.csv');parser.add_argument('--output',default='docs/blog-2027/auditoria-local.json');args=parser.parse_args()
 base=args.base_url.rstrip('/');base_parts=urllib.parse.urlsplit(base)
 inventory=list(csv.DictReader((ROOT/args.inventory).open()))
 failures=[];cache={};article_rows=[];redirect_rows=[];image_rows=[]
 def check(value,message):
  if not value:failures.append(message)
 def fetch(path):
  if path in cache:return cache[path]
  req=urllib.request.Request(base+path,headers={'User-Agent':'CottonCountryBlogAudit/2027'})
  try:
   with OPENER.open(req,timeout=30) as r:result=(r.status,dict(r.headers),r.read())
  except urllib.error.HTTPError as e:result=(e.code,dict(e.headers),e.read())
  except Exception as e:result=(0,{},str(e).encode())
  cache[path]=result;return result
 def local(href,source):
  url=urllib.parse.urlsplit(urllib.parse.urljoin(base+source,href))
  if url.scheme not in ('http','https') or url.hostname not in (base_parts.hostname,'cottoncountry.com.pe','www.cottoncountry.com.pe'):return None
  return (url.path or '/')+('?' + url.query if url.query else ''),url.fragment
 def header(headers,key):return next((v for k,v in headers.items() if k.lower()==key.lower()),None)
 canonical_paths={r['canonical'] for r in inventory}
 collections=deque(['/blog','/blog/categoria/algodon-y-cultura-textil','/blog/categoria/industria-y-materiales','/blog/categoria/compras-y-logistica','/blog/categoria/tallaje-y-dotaciones','/blog/categoria/uniformes-y-aplicaciones'])
 seen_collections=set();discovered=set();all_links=set();fragments=set();optimized=set()
 def gather(page,path):
  for href in page.links:
   item=local(href,path)
   if not item:continue
   target,fragment=item;all_links.add(target)
   if fragment:fragments.add((target,fragment))
   if target.split('?')[0] in canonical_paths:discovered.add(target.split('?')[0])
   if re.fullmatch(r'/blog(?:/categoria/[^/?]+)?(?:\?pagina=\d+)?',target) and target not in seen_collections:collections.append(target)
  for im in page.images:
   src=im.get('src','')
   if '%2Fblog%2F' in src or src.startswith('/blog/'):
    check(bool(im.get('alt')),f'Missing alt {path}: {src}')
    check(int(im.get('width','0'))>0 and int(im.get('height','0'))>0,f'Missing image geometry {path}')
    optimized.add(src)
 while collections:
  path=collections.popleft()
  if path in seen_collections:continue
  seen_collections.add(path);status,headers,body=fetch(path);check(status==200,f'Collection {path}: {status}')
  page=Page(body.decode('utf8'));check(page.h1==1,f'Collection H1 {path}');check(page.canonical==['https://cottoncountry.com.pe'+path],f'Collection canonical {path}: {page.canonical}');gather(page,path)
 for index,row in enumerate(inventory,1):
  path=row['canonical'];status,headers,body=fetch(path);page=Page(body.decode('utf8'));expected='https://cottoncountry.com.pe'+path
  check(status==200,f'Article {path}: {status}');check(page.h1==1,f'Article H1 {path}');check(page.canonical==[expected],f'Article canonical {path}');check(page.meta.get('og:url')==expected,f'OG URL {path}');check(page.meta.get('og:type')=='article',f'OG type {path}');check(len(page.meta.get('description',''))>60,f'Description {path}');check('noindex' not in page.meta.get('robots',''),f'Indexability {path}')
  graph=next((s.get('@graph') for s in page.schemas if '@graph' in s),[])
  schema=next((s for s in graph if s.get('@type')=='BlogPosting'),{})
  check(schema.get('url')==expected and schema.get('mainEntityOfPage',{}).get('@id')==expected,f'Schema canonical {path}')
  check(schema.get('datePublished') is None,f'Invented publication date {path}');check(schema.get('dateModified')==(row['updated_at'] or None),f'Modification date {path}');check('author' not in schema,f'Unverified author {path}')
  gather(page,path)
  article_rows.append({'path':path,'status':status,'canonical':page.canonical[0] if page.canonical else None,'h1':page.h1,'structured_data':bool(schema),'updated_at':schema.get('dateModified'),'internal_links':len([h for h in page.links if local(h,path)])})
  if index%15==0:print(f'Checked {index}/53 articles',flush=True)
 check(discovered==canonical_paths,'Articles not discoverable: '+str(sorted(canonical_paths-discovered)))
 # Check all known aliases and trailing variants without following redirects.
 for row in inventory:
  for kind in ['alias','alias_trailing','root_trailing']:
   path=row[kind];status,headers,body=fetch(path);location=header(headers,'location') or '';target=local(location,path)
   check(status in (301,308),f'Redirect {path}: {status}')
   check(target==(row['canonical'],''),f'Redirect target {path}: {location}')
   redirect_rows.append({'path':path,'status':status,'destination':target[0] if target else location,'hops':1 if target and fetch(target[0])[0]==200 else None})
 # Resolve every distinct internal target once, and detect loops/chains.
 link_rows=[]
 for path in sorted(all_links):
  status,headers,body=fetch(path);location=header(headers,'location');target=local(location,path) if location else None
  if status in (301,302,307,308):
   check(bool(target),f'External redirect {path}: {location}')
   if target:check(fetch(target[0])[0]==200,f'Redirect chain or invalid target {path}: {location}')
  else:check(status==200,f'Broken internal link {path}: {status}')
  link_rows.append({'path':path,'status':status,'destination':target[0] if target else None})
 for path,fragment in sorted(fragments):
  status,headers,body=fetch(path)
  if status==200:check(fragment in Page(body.decode('utf8')).ids,f'Missing fragment {path}#{fragment}')
 def image_check(path):
  status,headers,body=fetch(path);return {'path':path,'status':status,'bytes':len(body),'content_type':header(headers,'content-type')}
 image_paths=sorted({r['image'] for r in inventory if r['image']}|optimized)
 with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
  image_rows=list(pool.map(image_check,image_paths))
 for row in image_rows:check(row['status']==200 and (row['content_type'] or '').startswith('image/'),f'Broken image {row["path"]}: {row["status"]}')
 status,headers,body=fetch('/sitemap.xml');check(status==200,'Sitemap status')
 urls=ElementTree.fromstring(body).findall('.//{*}url');locations=[u.find('{*}loc').text for u in urls]
 for row in inventory:
  expected='https://cottoncountry.com.pe'+row['canonical'];check(locations.count(expected)==1,f'Sitemap canonical {expected}')
  entry=next((u for u in urls if u.find('{*}loc').text==expected),None)
  modified=entry.find('{*}lastmod') if entry is not None else None
  check((modified.text if modified is not None else None)==(row['updated_at'] or None),f'Sitemap timestamp {expected}')
 for path in seen_collections:
  if '?' not in path:check(locations.count('https://cottoncountry.com.pe'+path)==1,f'Sitemap collection {path}')
 check(not any('https://cottoncountry.com.pe/blog/'+r['slug'] in locations or 'https://cottoncountry.com.pe/blog/'+r['slug']+'/' in locations for r in inventory),'Alias in sitemap')
 unknown=['/no-existe-auditoria-blog-2027','/blog/no-existe-auditoria-blog-2027','/casino-prueba-inexistente','/blog/casino-prueba-inexistente','/wp-login.php','/blog/categoria/no-existe','/blog?pagina=999','/blog/categoria/algodon-y-cultura-textil?pagina=999']
 negatives=[]
 for path in unknown:
  status,headers,body=fetch(path);check(status in (404,410),f'Unknown route is not missing {path}: {status}');negatives.append({'path':path,'status':status})
 report={'scope':'Built local application; not production, Search Console or an exhaustive WordPress archive','checked_at_utc':datetime.now(timezone.utc).isoformat(),'summary':{'articles':len(article_rows),'discoverable_articles':len(discovered),'collections':len(seen_collections),'redirects':len(redirect_rows),'internal_targets':len(link_rows),'fragments':len(fragments),'images':len(image_rows),'negative_controls':len(negatives),'failures':len(failures)},'articles':article_rows,'collections':sorted(seen_collections),'redirects':redirect_rows,'internal_links':link_rows,'images':image_rows,'unknown_route_controls':negatives,'failures':failures}
 output=ROOT/args.output;output.parent.mkdir(parents=True,exist_ok=True);output.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps(report['summary'],ensure_ascii=False),flush=True)
 for item in failures:print('FAIL:',item)
 raise SystemExit(1 if failures else 0)
if __name__=='__main__':main()
