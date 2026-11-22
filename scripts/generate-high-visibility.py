"""Original editable SVG diagrams. No flat is assigned a performance class or certification."""
from pathlib import Path
from xml.sax.saxutils import escape
ROOT=Path(__file__).resolve().parents[1]/'public/blog/alta-visibilidad'
BLUE='#01018B';INK='#393535';YELLOW='#E8FF00';ORANGE='#FF8600';SILVER='#A4ADB5';LINE='#C9C8C3'
def text(x,y,value,size=24,color=INK,weight='normal',anchor='start'):
 return f'<text x="{x}" y="{y}" fill="{color}" font-family="Arial, sans-serif" font-size="{size}" font-weight="{weight}" text-anchor="{anchor}">{escape(value)}</text>'
def rect(x,y,w,h,fill,stroke='none',radius=0):return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" stroke="{stroke}"/>'
def base(title,desc,w,h,body):
 return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img" aria-labelledby="title desc"><title id="title">{escape(title)}</title><desc id="desc">{escape(desc)}</desc>{rect(0,0,w,h,'#FFFFFF')}{body}</svg>'''
def legend(y):
 return rect(40,y,28,20,YELLOW,INK)+text(80,y+17,'Fluorescente amarillo',20)+rect(340,y,28,20,ORANGE,INK)+text(380,y+17,'Fluorescente naranja',20)+rect(670,y,28,20,SILVER,INK)+text(710,y+17,'Retrorreflectivo',20)
# Areas are shown as material swatches, never as classified garment silhouettes.
b=text(40,60,'ISO 20471: clases y superficies relativas',38,BLUE)+text(40,103,'Comparación de mínimos para materiales separados; no representa prendas.',24)+legend(140)
for i,(cls,fluor,retro) in enumerate([(1,.14,.10),(2,.50,.13),(3,.80,.20)]):
 x=40+i*380
 b+=text(x,230,f'Clase {cls}',32,BLUE,'bold')+text(x,275,'Fondo fluorescente',21)+rect(x,294,round(300*fluor/.8),66,YELLOW,INK)+text(x,405,'Retrorreflectivo',21)+rect(x,425,round(300*retro/.2),26,SILVER,INK)
b+=text(40,520,'Comparar los valores en el cuadro de superficies mínimas del artículo.',23)+text(40,560,'La superficie por sí sola no acredita clase, diseño ni desempeño.',23,BLUE)
(ROOT/'clases-iso.svg').write_text(base('ISO 20471: clases 1, 2 y 3','Bloques comparativos de material de fondo y retrorreflectivo. No se atribuye clase a un flat.',1200,600,b))
# ANSI contexts: warehouse, roadway and communication equipment, no brands or people.
b=text(40,60,'ANSI/ISEA 107-2020: tipos de uso',38,BLUE)+text(40,103,'El tipo identifica el contexto de utilización, no una categoría de prenda.',24)
for i,(kind,lines) in enumerate([('O',['Fuera de vías públicas','Riesgos de vehículos','o equipos móviles']),('R',['Tránsito vial','Vehículos y equipos','móviles']),('P',['Seguridad pública','Respuesta a','emergencias'])]):
 x=40+i*390
 b+=rect(x,145,340,365,'#FFFFFF',LINE,16)+text(x+28,195,'Tipo '+kind,32,BLUE,'bold')
 if kind=='O':
  b+=f'<path d="M{x+90} 290V245L{x+170} 213L{x+250} 245V290M{x+90} 245H{x+250}M{x+140} 290V258H{x+200}V290" fill="none" stroke="{BLUE}" stroke-width="5"/>'
 elif kind=='R':
  b+=f'<path d="M{x+115} 215L{x+85} 295M{x+225} 215L{x+255} 295M{x+170} 220V238M{x+170} 252V270M{x+170} 284V295" fill="none" stroke="{BLUE}" stroke-width="5"/>'
 else:
  b+=rect(x+135,235,70,70,ORANGE,BLUE,8)+f'<path d="M{x+150} 235L{x+140} 215M{x+190} 255H{x+151}M{x+150} 275H{x+175}" stroke="{BLUE}" stroke-width="5"/>'
 for j,line in enumerate(lines):b+=text(x+28,355+j*37,line,24)
b+=text(40,560,'Evaluar la operación y la clase aplicable; no hay equivalencia automática con ISO.',23,BLUE)
(ROOT/'tipos-ansi.svg').write_text(base('Tipos O, R y P de ANSI/ISEA 107-2020','Tres contextos de uso representados sin prendas clasificadas ni marcas comerciales.',1200,600,b))
def garment(kind,color,back,uid):
 if kind=='vest':path='M55 20L82 8H118L145 20L138 78L160 92V255H40V92L62 78Z'
 elif kind=='short':path='M55 25L82 8H118L145 25L192 80L156 113L143 88V255H57V88L44 113L8 80Z'
 elif kind=='pants':path='M45 18H155L166 267H110L100 104L90 267H34Z'
 else:path='M55 25L82 8H118L145 25L175 75L195 205L157 215L140 117V255H60V117L43 215L5 205L25 75Z'
 b=f'<defs><clipPath id="{uid}"><path d="{path}"/></clipPath></defs><path d="{path}" fill="{color}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
 b+=f'<g clip-path="url(#{uid})">'
 if kind=='pants':
  b+=rect(0,177,200,22,SILVER)+rect(0,224,200,22,SILVER)
  if not back:b+=f'<path d="M100 18V86M45 33H155" stroke="{INK}" fill="none" stroke-width="2"/>'
 else:
  b+=rect(0,155,200,22,SILVER)+rect(0,208,200,22,SILVER)
  if kind in ['long','jacket']:b+=rect(0,107,200,22,SILVER)
  b+=rect(62,15,17,143,SILVER)+rect(121,15,17,143,SILVER)
  if not back:
   b+=f'<path d="M82 9L100 43L118 9" stroke="{INK}" stroke-width="3" fill="none"/>'
   if kind in ['vest','jacket']:b+=f'<path d="M100 43V254" stroke="{INK}" stroke-width="2"/>'
  else:b+=f'<path d="M82 9Q100 25 118 9" stroke="{INK}" stroke-width="3" fill="none"/>'
 b+='</g>'
 return b
b=text(40,54,'Prendas de alta visibilidad',36,BLUE)+text(40,94,'Vistas anterior y posterior · esquemas ilustrativos sin escala',24)+legend(130)
models=[('Chaleco','vest',YELLOW),('Casaca','jacket',ORANGE),('Polo de manga corta','short',YELLOW),('Polo de manga larga','long',ORANGE),('Pantalón','pants',ORANGE),('Conjunto','set',YELLOW)]
for i,(name,kind,color) in enumerate(models):
 x=40+(i%2)*480;y=200+(i//2)*425
 b+=text(x,y,name,27,BLUE,'bold')
 for j,back in enumerate([False,True]):
  px=x+j*220;py=y+28
  if kind=='set':
   b+=f'<g transform="translate({px+30} {py}) scale(.67)">{garment("long",ORANGE,back,f"g{i}-{j}-a")}</g><g transform="translate({px+45} {py+169}) scale(.52)">{garment("pants",YELLOW,back,f"g{i}-{j}-b")}</g>'
  else:b+=f'<g transform="translate({px} {py+15})">{garment(kind,color,back,f"g{i}-{j}")}</g>'
  b+=text(px+100,y+358,'Posterior' if back else 'Anterior',21,INK,anchor='middle')
 b+=f'<path d="M{x} {y+390}H{x+435}" stroke="{LINE}"/>'
b+=text(40,1510,'Ningún esquema acredita una clase o certificación.',25,BLUE)+text(40,1545,'Verificar diseño completo, superficies, materiales y documentación de conformidad.',21)
(ROOT/'prendas-vistas.svg').write_text(base('Vistas técnicas de seis prendas de alta visibilidad','Chaleco, casaca, polo de manga corta, polo de manga larga, pantalón y conjunto; cada uno de frente y de espalda. Fluorescente amarillo o naranja y cinta gris. Sin clase atribuida.',1000,1560,b))
print('Generated 3 original editable SVGs; no garment certification or performance class claimed.')
