#!/usr/bin/env python3
"""Extract the owner's original Word text in document order, without editorial edits."""
import argparse, hashlib, html, json, re, unicodedata, zipfile
from html.parser import HTMLParser
from pathlib import Path
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'docs/blog-2027/source/BLOG - COTTON COUNTRY.docx'
W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
R = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships'
NS = {'w': W}
ALIASES = {'el-nino-2026-2027-impacto-industria-textil-peru': 'el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil'}
UNMAPPED_LINKS = {'/mascarillas', '/bioseguridad'}
# Existing standalone subsection text. No words are written into the article by this list.
HEADINGS = set('''Uniformes para el sector salud|Uniformes para cocina|Uniformes para trabajos en la vía pública|Uniformes para atención al público|Ayuda a construir la imagen de marca|Los empleados vestirán según el código de vestimenta|Contribuye a la fidelización del cliente interno|Características de los uniformes de chef|¿Cómo personalizar la chaqueta de chef?|Tipos de tela para uniformes de chef|Debe brindar protección al cuerpo del empleado|Debe ayudar a la visibilidad del trabajador|Deben usarse telas inteligentes|Características del uniforme de farmacia|Beneficios de comprar uniformes de farmacia|No escasearán las mascarillas quirúrgicas|Usar mascarillas reutilizables lavables ayuda al medioambiente|Ahorrarás dinero|Los modelos aprobados por el MINSA|Materiales con los que deben fabricarse|Etiquetado y embolsado de mascarillas de tela|La mascarilla debe cumplir con las características especificaciones técnicas dadas por el MINSA|Pruebe estos trucos para saber si la mascarilla le protege|Escudos faciales sin mascarillas en entornos de bajo riesgo|Las mascarillas de tela VS los escudos faciales|Escudos faciales más mascarillas para mejorar la protección|Tenga en cuenta el tiempo de vida de su mascarilla|Lave su mascarilla de tela certificada tras usarlas|Guarde su mascarilla en un lugar libre de gérmenes|Empaques antihongos y antibacterial D2P|Empaques biodegradables d2w|Sobre el diseño de las mascarillas reutilizables|Respecto al tejido|En relación con la estructura del tejido|Especificaciones técnicas del tejido|Etiquetado y embolsado de mascarillas comunitarias|Revisa las siguientes características para confirmar que tienes una mascarilla según las normas técnicas|Sobre los módulos de producción|Sobre la manipulación de insumos y/o productos|Acerca de la distribución de productos terminados|Medidas en caso de presentarse un caso de persona con COVID-19|Nuevas aplicaciones de delivery|Los desafíos del delivery para el sector textil|Entonces, ¿a qué se debe todo lo anterior?|¿Cómo saber qué talla soy para comprarme el uniforme ideal?|Nuestra experiencia|Productividad|Calidad|Tendencias|El efecto de la norma|Un poco de historia|No todos ganan siempre|Compras de uniformes|Los dioses del Olimpo y su influencia|Ganar ganar|¿A qué llamamos tallas completas?|¿Por qué es importante las tablas de medidas?|¿Cómo se elabora una tabla de medidas?|¿Qué hace bueno a un patronista?|¿Es mejor patrones en cartón o en software?|Estimado Dr. Cuéntenos por favor sobre el algodón Pima.|Entonces, ¿Cómo y cuándo llego al Peru?|Introducción:|Identifica tus necesidades|Reflexiona sobre la imagen de tu marca.|Considera la comodidad de tus empleados.|Elige materiales duraderos.|Personaliza tu uniforme.|Conclusión:|Prendas de Invierno para el Sector Bancario|Prendas de Invierno para el Sector Automotriz|Prendas de Invierno para el Sector Tecnológico - Logístico|Prendas de Invierno para el Sector Retail|Conclusión|Un poco de historia: La valentía de las mujeres en la industria textil|Vestir el cambio: La importancia de un uniforme pensado para ellas|Mujeres en la industria textil: La fuerza detrás de cada hilo|Más que una fecha, un compromiso permanente|El primer error: creer que todos los plazos de entrega son iguales|Definir antes de cotizar|La experiencia de Cotton Country|Una buena compra empieza antes de la primera cotización|El primer mito: las tallas existen|El caso peruano hace el reto aún mayor|¿Las tallas completas solucionan el problema?|¿Cada colaborador conoce realmente su talla?|La tecnología ayuda, pero no reemplaza el proceso|La conclusión'''.split('|'))
SUBHEADINGS = {'Mascarilla de dos piezas o barbijo', 'Mascarilla de tela con pliegues', 'Ventajas:', 'Desventajas:', 'Limitaciones:'}
class TextOnly(HTMLParser):
    def __init__(self): super().__init__(convert_charrefs=True); self.parts=[]
    def handle_data(self, data): self.parts.append(data)
def inline_plain(text):
    text = re.sub(r'\[([^\]\n]+)\]\([^\s)]+\)', lambda m: m[1], text)
    for _ in range(3):
        text=re.sub(r'\*\*([^*]+)\*\*',r'\1',text)
        text=re.sub(r'(?<!\*)\*([^*\n]+)\*(?!\*)',r'\1',text)
    p=TextOnly();p.feed(text);p.close()
    return unicodedata.normalize('NFC', html.unescape(''.join(p.parts)))
def normalize(text): return ' '.join(unicodedata.normalize('NFC',text).split())
def visible(el):
    out=[]
    for n in el.iter():
        if n.tag==f'{{{W}}}t':out.append(n.text or '')
        elif n.tag in {f'{{{W}}}tab',f'{{{W}}}br',f'{{{W}}}cr'}:out.append(' ')
    return ''.join(out)
def paragraph_markup(el, rels, unlinked):
    out=[]
    for node in el:
        if node.tag==f'{{{W}}}pPr':continue
        text=visible(node)
        if node.tag==f'{{{W}}}hyperlink':
            href=rels.get(node.get(f'{{{R}}}id'))
            if href:
                # Only two discontinued non-blog product URLs lack a counterpart.
                from urllib.parse import urlsplit
                u=urlsplit(href)
                if u.hostname in {'cottoncountry.com.pe','www.cottoncountry.com.pe'} and u.path.rstrip('/') in UNMAPPED_LINKS:
                    unlinked.append({'href':href,'text':text});href=None
                elif u.hostname in {'sizeset.com','www.sizeset.com'}:href='https://sizeset.com'
            if href and text:out.append('<a href="'+html.escape(href,quote=True)+'">'+html.escape(text)+'</a>')
            else:out.append(text)
        else:out.append(text)
    return ''.join(out).strip()
def extract():
    with zipfile.ZipFile(SOURCE) as z:
        body=ET.fromstring(z.read('word/document.xml')).find('w:body',NS)
        rels={n.get('Id'):n.get('Target') for n in ET.fromstring(z.read('word/_rels/document.xml.rels')) if n.get('TargetMode')=='External'}
        children=list(body);records=[];unlinked=[];packaging=[]
        entries=[]
        for idx,node in enumerate(children):
            if node.tag!=f'{{{W}}}p':continue
            match=re.match(r'^\s*slug\s*:\s*(\S+)\s*$',visible(node),re.I)
            if not match:continue
            prev=idx-1
            while prev>=0 and not visible(children[prev]).strip():prev-=1
            title=visible(children[prev]).strip();number=len(entries)+1
            m=re.match(r'^'+str(number)+r'\s*\.(?:\s*-)?\s*(?:T[ií]tulo:\s*)?(.+)$',title,re.I)
            if not m:raise ValueError(f'Unidentified article title {number}: {title!r}')
            title=m[1].strip()
            if number==33 and title.endswith(' - Foto:'):
                packaging.append({'article':33,'location':'title metadata','text':' - Foto:'});title=title[:-8].rstrip()
            entries.append({'start':idx+1,'titleIndex':prev,'wordSlug':match[1],'title':title})
        if len(entries)!=53:raise ValueError(f'Expected 53 Word articles, found {len(entries)}')
        for i,entry in enumerate(entries):
            end=entries[i+1]['titleIndex'] if i<52 else len(children);blocks=[]
            for idx in range(entry['start'],end):
                node=children[idx]
                if node.tag==f'{{{W}}}tbl':
                    rows=[[visible(cell).strip() for cell in row.findall('w:tc',NS)] for row in node.findall('w:tr',NS)]
                    blocks.append({'kind':'table','rows':rows,'sourceNode':idx});continue
                if node.tag!=f'{{{W}}}p':continue
                text=visible(node).strip()
                if not text:continue
                if not blocks and re.fullmatch(r'Contenido\s*:\s*',text,re.I):continue
                if i==52 and text in {'`,','},',']',' ];','];'}:
                    packaging.append({'article':53,'location':'trailing source-object delimiter','text':text});continue
                markup=paragraph_markup(node,rels,unlinked)
                style=node.find('w:pPr/w:pStyle',NS);sty=style.get(f'{{{W}}}val') if style is not None else ''
                md=re.match(r'^(#{1,3})\s+(.+)$',text)
                ordered=bool(re.match(r'^\d+[.)]\s+',text))
                if text=='---':blocks.append({'kind':'divider','sourceNode':idx});continue
                if md or sty in {'Heading1','Heading2','Heading3'} or text in HEADINGS or (ordered and re.match(r'^\d+\. (?:Compras|Uniformes|¿Por Qué|¿Cuál|Conclusión|Sostenibilidad|Tecnología|Personalización|Moda|Economía|Diversidad)',text)):
                    level=3 if sty=='Heading3' or (md and md[1]=='###') else 2
                    blocks.append({'kind':'heading','level':level,'text':md[2] if md else text,'markup':re.sub(r'^#{1,3}\s+','',markup),'sourceNode':idx});continue
                if text in SUBHEADINGS:blocks.append({'kind':'heading','level':3,'text':text,'markup':markup,'sourceNode':idx});continue
                list_match=re.match(r'^(?:([-*])\s+|\d+\)\s+)(.+)$',text)
                # The original article 19 explicitly enumerates a three-point checklist.
                if i==18 and re.match(r'^\d+\.\s+',text):
                    blocks.append({'kind':'list','ordered':True,'text':re.sub(r'^\d+\.\s+','',text),'markup':re.sub(r'^\d+\.\s+','',markup),'sourceNode':idx});continue
                if list_match:
                    blocks.append({'kind':'list','ordered':not bool(list_match[1]),'text':list_match[2],'markup':re.sub(r'^(?:[-*]|\d+\))\s+','',markup),'sourceNode':idx});continue
                blocks.append({'kind':'paragraph','text':text,'markup':markup,'sourceNode':idx})
            words=[]
            for b in blocks:
                if b['kind']=='table':words += [inline_plain(cell) for row in b['rows'] for cell in row]
                elif b['kind']!='divider':words.append(inline_plain(b['text']))
            records.append({'id':i+1,'wordSlug':entry['wordSlug'],'slug':ALIASES.get(entry['wordSlug'],entry['wordSlug']),'title':entry['title'],'blocks':blocks,'normalizedText':normalize(' '.join(words)),'addedHeadings':['Cotton Country conversa con ChatGPT'] if i+1 in {37,39} else []})
        return {'sourceFile':str(SOURCE.relative_to(ROOT)),'sha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'articleCount':len(records),'excludedContainerMetadata':packaging,'unlinkedUnavailableProductURLs':unlinked,'articles':records}
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--write',type=Path);args=parser.parse_args();out=json.dumps(extract(),ensure_ascii=False,indent=2)+'\n'
    if args.write:args.write.write_text(out)
    else:print(out,end='')
