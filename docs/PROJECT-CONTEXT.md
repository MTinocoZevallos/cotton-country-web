# Cotton Country 2027 — contexto permanente del proyecto

Documento de continuidad del rediseño B2B. Fecha de auditoría: **2026-11-11 (America/Lima)**. Base auditada: `redesign-2027-home`, HEAD `f0f25c90a0a318431f880be2aa06ee9b51790d93`. El registro de alcance y Git está en §13.

**Actualización de continuidad:** el hito de §16 parte del estado aprobado `be071dd1a01fcf87f3e061040e820f64512c614d` y sustituye el estado anterior del catálogo y su recorrido. Los informes históricos y el registro de la auditoría original se conservan como tales; no constituyen aprobación visual del nuevo hito.

## Convención de evidencia

- **VERIFICADO EN CÓDIGO:** inspección de archivos y datos del HEAD indicado; no equivale a funcionamiento remoto, aprobación comercial ni despliegue en producción.
- **DOCUMENTADO HISTÓRICAMENTE:** un informe conservado describe una intervención o prueba anterior; sus resultados requieren contraste con el código vigente.
- **DECISIÓN DEL PROPIETARIO:** objetivo, aprobación o restricción proporcionados por el propietario; no se presentan como hechos técnicos demostrados por el repositorio.
- **PENDIENTE DE VALIDACIÓN:** comportamiento, dato o resultado que esta auditoría no confirmó. Una implementación existente no elimina esta categoría.

## 1. Propósito comercial

**DECISIÓN DEL PROPIETARIO:** web corporativa B2B de Cotton Country S.A.C. en Perú, dirigida a compradores empresariales y organizaciones, no a consumidores minoristas. Su función es presentar capacidades y referencias y captar requerimientos de uniformes, no operar una tienda minorista.

**VERIFICADO EN CÓDIGO:** los contenidos solicitan información de empresa, correo corporativo, RUC y requerimiento; no hay un flujo de carrito o pago en las rutas revisadas (`components/ContactForm.tsx`, `app/uniformes/page.tsx`). Las páginas legales identifican a **SANTELA S.A.C. como titular/operador de Cotton Country** (`app/terminos/page.tsx`, `app/privacidad/page.tsx`, `app/derechos-arco/page.tsx`). **PENDIENTE DE VALIDACIÓN:** conciliar la denominación del objetivo del propietario con esa razón social antes de cambiar textos legales; esta auditoría no los modifica ni certifica la identidad jurídica.

## 2. Objetivo técnico

**DECISIÓN DEL PROPIETARIO:** terminar y publicar el rediseño 2027 con calidad UX, SEO, accesibilidad, rendimiento móvil, estabilidad y mantenibilidad. La publicación final exige revisión integral y autorización; tener páginas implementadas o un Preview no implica haber cumplido estos objetivos en producción.

## 3. Stack y arquitectura reales

**VERIFICADO EN CÓDIGO:**

- Next.js **16.1.1**, React y React DOM **19.2.3**; TypeScript `^5`, Tailwind CSS `^4` y `@tailwindcss/postcss` `^4`. Dependencias adicionales declaradas: `lucide-react` `^0.562.0`, `react-icons` `^5.5.0`, `resend` `^6.12.4`. ESLint `^9`, configuración Next **16.1.1**. Los rangos son declaraciones, no versiones exactas de cada dependencia instalada (`package.json`, `package-lock.json`).
- App Router en `app/`; layout compartido con Header y Footer; componentes de Home en `components/`, componentes editoriales de Uniformes en `components/uniforms/`. No hay migración de arquitectura pendiente autorizada.
- Datos de sectores, categorías y casos en `lib/uniforms.ts`; modelos editoriales aprobados en `lib/garment-models.ts`, consumidos por las cinco páginas de familia y proyectados como `garments` para el catálogo filtrable. Contexto comercial de contacto en `lib/contact-context.ts`; artículos en el arreglo tipado de `app/blog/posts.ts`. No se identificó CMS, ORM o base de datos en este flujo; no atribuirlos al proyecto.
- Estilos: Tailwind en `app/globals.css`, tokens en `app/design-tokens.css`, módulos `components/home.module.css`, `components/chrome.module.css` y `components/uniforms/uniforms.module.css`. Tipado estricto y alias `@/*` en `tsconfig.json`; configuración Next sin opciones activas adicionales en `next.config.ts`.
- Imágenes y fuentes locales en `public/` y `app/fonts/`; `next/image`, `next/font/local`, `next/link` y `next/script` según cada componente.
- Scripts disponibles: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`; TypeScript: `npx --no-install tsc --noEmit`. No hay script `test` en el manifiesto, pero sí `tests/contact-context.test.mjs`, ejecutable con `node --test tests/contact-context.test.mjs`; usa transportes simulados para correo/captcha. No confundirlo con pruebas de los servicios reales. No se ejecutó en esta auditoría documental.

Integraciones respaldadas: Resend y Cloudflare Turnstile en ambas API; Google Tag Manager en `app/layout.tsx`; enlace externo a SizeSet en `components/Header.tsx`; mapa y redes en `components/Footer.tsx`. El enlace a SizeSet no demuestra una integración de su servicio. Vercel Preview es **contexto de trabajo proporcionado y observado en los hitos anteriores del chat**, no prueba de configuración vigente de Vercel contenida en el repositorio. No registrar credenciales ni valores de configuración privada aquí.

El `README.md` conserva texto genérico de create-next-app y una referencia a Geist: no usarlo como fuente principal de la tipografía real.

## 4. Decisiones comerciales y editoriales

**DECISIÓN DEL PROPIETARIO:** priorizar especificaciones técnicas, materiales, confección, desempeño, tallaje, calidad, cumplimiento y abastecimiento. Formular mensajes B2B específicos por sector y función del equipo. No inventar certificaciones, capacidades, cifras, resultados, testimonios ni garantías de desempeño.

Preservar las decisiones aprobadas de la Home y los textos respaldados de los catálogos. Describir el modelo de drill de corte jean como drill; no convertirlo editorialmente en denim. No convertir detalles reflectivos en certificaciones o promesas de protección no documentadas (`app/uniformes/pantalones-caballero/page.tsx`). Los relatos y resultados ya escritos en `lib/uniforms.ts` son contenido implementado; su presencia no constituye verificación independiente de esos resultados.

## 5. Sistema visual vigente

### Tokens exactos

**VERIFICADO EN CÓDIGO:** declaraciones de `app/design-tokens.css`; no sustituir estos valores por aproximaciones ni asumir que todas las páginas antiguas los aplican.

```css
--cc-blue: #01018B;
--cc-ivory: #F6F5F2;
--cc-lime: #D7FF00;
--cc-charcoal: #393535;
--cc-deep-blue: #04045E;
--cc-white: #FFFFFF;
--cc-text-secondary: color-mix(in srgb, var(--cc-charcoal) 82%, var(--cc-ivory));
--cc-text-on-dark: color-mix(in srgb, var(--cc-white) 84%, transparent);
--cc-line: color-mix(in srgb, var(--cc-charcoal) 28%, transparent);
--cc-line-on-dark: color-mix(in srgb, var(--cc-white) 28%, transparent);
--cc-font-heading: var(--font-manrope), Arial, sans-serif;
--cc-font-body: var(--font-inter), Arial, sans-serif;
--cc-h1: clamp(2.625rem, 6.67vw, 6rem);
--cc-h2: clamp(2rem, 4.45vw, 4rem);
--cc-h3: clamp(1.4375rem, 2.5vw, 2.25rem);
--cc-body: clamp(1rem, 1.25vw, 1.125rem);
--cc-ui: clamp(.9375rem, 1.12vw, 1rem);
--cc-label: clamp(.6875rem, .92vw, .8125rem);
--cc-radius-control: 14px;
--cc-heading-tracking: -.045em;
--cc-section-space: clamp(4rem, 6.67vw, 6rem);
```

### Fuentes, composición y comportamiento

**VERIFICADO EN CÓDIGO:** Manrope local variable 200–800 e Inter local variable 100–900, estilo normal, `display: swap`, fallback Arial ajustado; sus variables se aplican al elemento `html` (`app/fonts.ts`, `app/layout.tsx`). DM Serif Display local, normal 400, variable `--font-editorial-serif`, `swap` (`components/home-font.ts`). Aunque su comentario menciona solo Home, también se importa en Uniformes, catálogos, sectores, casos y Contacto. Inter sirve para texto/interfaz; la serif para títulos editoriales y citas; Manrope para identificaciones y encabezados que siguen el token global. Las licencias están en `app/fonts/`; `app/fonts/README.md` documenta procedencia histórica, no una nueva auditoría de integridad.

- **Navegación:** cabecera fija de 80 px; azul, translúcida en Home; logo a la izquierda, navegación centrada mediante columnas laterales iguales y contacto a la derecha. Uniformes enlaza directamente a `/uniformes`, sin desplegable; Blog a `/blog`, Contacto a `/#contacto`, SizeSet a destino externo y Contáctanos a correo. Menú móvil hasta 900 px, estado expandido, cierre con Escape y devolución del foco; enlace para saltar a `#contenido` (`components/Header.tsx`, `components/chrome.module.css`).
- **Hero:** título en dos líneas «¿De qué viste / tu marca?», geometría reservada durante tipeado, CTA a `/uniformes`, recurso actual `public/home-2027/hero.webp`. `next/image` con `preload`, sin `unoptimized`; fondo CSS y máscaras complementarias. Escritura por caracteres cada 72 ms; fases a 2150, 2650 y 3350 ms. Desktop: 90svh, mínimo 620 y máximo 820 px; adaptación móvil bajo 767 px. Alternativa sin JavaScript y movimiento reducido (`components/Hero.tsx`, `components/home.module.css`).
- **Filosofía:** «Cada detalle cuenta.», asesoría, método y cumplimiento; iconos Lucide de 36 px, trazo 1.5. Dos columnas que pasan a una bajo 900 px; revelados con IntersectionObserver y alternativa de movimiento reducido (`components/ThreeReasons.tsx`, `components/HomeExperience.tsx`).
- **Prendas de Home:** cinco fotografías y cuatro etiquetas de familia, con pantalón masculino y femenino separados visualmente. En §16 se actualizan exclusivamente sus dos destinos a `/uniformes/pantalones-caballero` y `/uniformes/pantalones-dama`. Carrusel horizontal con scroll-snap: cuatro visibles en escritorio, dos hasta 1023 px y una hasta 575 px. Intervalo de 4000 ms condicionado a visibilidad, pestaña, movimiento, hover, foco, tacto y pausa. Marco 3:4, imagen `contain`, radios 24/20 px y hover moderado. Indicadores y control de pausa visible al recibir foco (`components/Basics.tsx`, `components/home.module.css`).
- **Testimonios:** tres citas implementadas, atribuidas a Colegio de Ingenieros del Perú, DecorCenter y Zoomlion. Rotación actual de **4000 ms** mediante un timeout; pausa por hover, tacto, pestaña oculta, movimiento reducido o botón explícito. Observación de visibilidad con umbral cero. Indicadores y teclas izquierda/derecha/Home/End; paneles inactivos con `aria-hidden` e `inert`; altura medida con ResizeObserver. Cita actual de 20 px en escritorio y 18 px en móvil; pausa disponible al foco; no hay botones visibles Anterior/Siguiente en el JSX actual (`components/Testimonials.tsx`, `components/home.module.css`). No modificar ni agregar citas sin aprobación.
- **Catálogos editoriales:** filas alternadas de imagen y texto, dos columnas y una bajo 575 px; separación reducida bajo 900 px. Imagen con ancho fluido y altura automática, sin recorte impuesto por las filas; CTA de píldora lima y enlace de retorno. Camisas añade listas técnicas y cierre editorial (`components/uniforms/uniforms.module.css`, páginas de §7).
- **Contacto y footer:** contacto de Home en dos columnas, una bajo 900 px; campos legibles, botón lima de píldora. Footer blanco con logo azul, enlaces legales, contacto, redes y mapa dentro de `details` con iframe lazy; cuatro columnas, dos hasta 1100 px y una hasta 767 px (`components/ContactForm.tsx`, `components/Footer.tsx`, módulos CSS).

### Contraste con informes aprobados

| Evidencia histórica | Diferencia verificada en el HEAD auditado |
| --- | --- |
| `docs/home-2027-review.md`: Hero natural `hero-airport-natural.webp`, `unoptimized`, cuadrícula de cuatro prendas | El Hero usa `/home-2027/hero.webp` y Prendas es un carrusel de cinco fotos. No restaurar automáticamente la versión histórica. |
| `docs/navigation-testimonials-review.md`: autoplay de siete segundos, pausa persistente por foco/interacción y controles anteriores | El código usa cuatro segundos y la política de pausa descrita arriba. El enlace directo a Uniformes sí permanece. |
| `docs/testimonial-autoplay-verification.md`: ciclos medidos de siete segundos en Chromium y corrección de pausas | La política corregida sigue reconocible, pero el intervalo vigente es cuatro segundos. Esas mediciones no validan la temporización actual. |

**DOCUMENTADO HISTÓRICAMENTE:** esos informes registran build de 126 páginas, TypeScript, lint y pruebas locales de escritorio/móvil; el lint histórico incluía cinco advertencias. No son una medición actual ni pruebas de Preview, dispositivos físicos, envíos reales o Core Web Vitals. **PENDIENTE DE VALIDACIÓN:** revalidar los cambios posteriores antes de publicar; esta auditoría no revierte decisiones visuales.

## 6. Estado funcional por área

| Área | VERIFICADO EN CÓDIGO | PENDIENTE DE VALIDACIÓN / alcance |
| --- | --- | --- |
| Home `/` | Hero → filosofía → Prendas → testimonios → formulario, dentro de HomeExperience (`app/page.tsx`). | Revisión UX integral del estado actual; no asumir que las pruebas históricas cubren sus cambios posteriores. |
| Uniformes `/uniformes` | Introducción → catálogo filtrable de 30 modelos → requerimientos → sectores públicos → CTA (`app/uniformes/page.tsx`, `components/uniforms/Catalog.tsx`). Filtros sincronizados con `?categoria=…#prendas`; cada modelo enlaza a su familia y ancla numerada. Los casos se descubren dentro del sector, sin atajos directos a clientes en la página general. | Polos, Chalecos y Sacos pendientes, sin modelos heredados ni fotografías inventadas. Revisión visual final del propietario pendiente. |
| Catálogos y casos | Rutas y datos de §§7–9; componentes CaseRoles, CaseSeasons y Projects. | Publicado en datos no equivale a estar desplegado o aprobado en producción. |
| Blog | Listado en `/blog`; artículos en `/blog/[slug]` y alias `app/[slug]/page.tsx`; datos locales, imágenes en `public/blog/`, generación estática, canonical hacia la ruta raíz del artículo y Open Graph por artículo. Renderizado de contenido local con HTML (`dangerouslySetInnerHTML`). | Rediseño editorial pendiente; revisar contenido/HTML, semántica, imágenes y coherencia de alias/canónicas antes de publicar. No hay CMS demostrado. |
| Contacto | `/contacto` reutiliza ContactForm; contexto sector/caso/prenda derivado de rutas conocidas y saneado antes del correo (`lib/contact-context.ts`). Cinco campos obligatorios; guardas de captcha; API comprueba campos y excluye dominios personales listados (`app/api/contact/route.ts`). | No es validación completa de RUC, teléfono, pertenencia empresarial o entrega de correo. Revisar validación de tipos, tratamiento de errores del proveedor, abuso y mensajes accesibles. |
| Privacidad y legales | `/privacidad`, `/terminos`, `/derechos-arco`; formulario ARCO y `/api/privacy-request`, tipos de solicitud admitidos y validación Turnstile (`components/PrivacyRequestForm.tsx`). | Revisión legal y prueba integral autorizada, incluida entrega de correo; no certificadas por existencia del código. |
| SEO | `metadataBase` de producción y `lang=es`; Home con canonical, Open Graph y Twitter; títulos/descripciones/canónicas en catálogos y rutas sectoriales/casos. Pantalones incluye imágenes sociales. `app/sitemap.ts` incluye ambos catálogos nuevos y solo sectores públicos/casos filtrados; `app/robots.ts` permite `/`. | Revisar cobertura global de metadatos, indexación real, duplicados, datos estructurados y política de indexación de Preview. No se identificó JSON-LD en los archivos revisados. |
| Analítica | Carga GTM en `app/layout.tsx`; `email_click` en el botón de correo del Header y `formulario_enviado` tras respuesta exitosa en ContactForm. | No acredita recepción en GTM/GA, conversiones, consentimiento o entrega del correo. Validación real pendiente, sin registrar identificadores privados aquí. |

Las API implementan Resend y Turnstile; no se hicieron peticiones a esos proveedores ni se inspeccionaron valores privados. Ambas esperan la llamada de envío, pero no comprueban explícitamente el campo de error devuelto por el SDK antes de responder éxito: revisar ese comportamiento como **oportunidad de auditoría**, sin declararlo un fallo remoto reproducido.

## 7. Catálogos verificados y recursos

**VERIFICADO EN CÓDIGO:** conteo de los arreglos de modelos y archivos presentes en sus directorios; las rutas coinciden con `garmentCategories` de `lib/uniforms.ts`.

| Familia | Modelos | Página | Directorio de recursos |
| --- | ---: | --- | --- |
| Blusas | 7 | `app/uniformes/blusas/page.tsx` → `/uniformes/blusas` | `public/uniformes/blusas-2027/` — 7 PNG |
| Camisas | 5 | `app/uniformes/camisas/page.tsx` → `/uniformes/camisas` | `public/uniformes/camisas-2027/` — 5 WebP |
| Pantalones de dama | 6 | `app/uniformes/pantalones-dama/page.tsx` → `/uniformes/pantalones-dama` | `public/uniformes/pantalones-dama-2027/` — 6 PNG, 1312 × 1199 |
| Pantalones de caballero | 6 | `app/uniformes/pantalones-caballero/page.tsx` → `/uniformes/pantalones-caballero` | `public/uniformes/pantalones-caballero-2027/` — 6 PNG, 1536 × 1024 |
| Casacas | 6 | `app/uniformes/casacas/page.tsx` → `/uniformes/casacas` | `public/prendas/casaca-*.webp` — 6 originales, nombres conservados |

Los dos catálogos de pantalones presentan ambas vistas dentro de cada imagen, revisadas visualmente en los hitos de implementación anteriores del chat. Caballero conserva este orden: chino de drill; drill corte jean; vestir de lanilla; cargo de drill; cargo con cintas reflectivas; cargo con refuerzos de rodilla. Esta auditoría vuelve a comprobar el inventario y las dimensiones de los PNG frente a las declaradas; no realiza una nueva inspección visual.

Los **30 modelos** comparten una fuente en `lib/garment-models.ts`. Se conservan textos, orden y recursos de los 24 modelos de las cuatro familias anteriores. Casacas recibe la corrección comercial genérica descrita en §16. También existen páginas anteriores `/uniformes/pantalones`, `/uniformes/polos` y `/uniformes/scrubs`; no se eliminan ni redirigen y sus recursos no se mezclan con el catálogo aprobado. Solo los enlaces obsoletos de pantalones en Home cambian hacia las páginas editoriales vigentes.

**DECISIÓN DEL PROPIETARIO:** las seis fotografías de Casacas ya fueron proporcionadas y aprobadas. Nombres públicos: Casaca doble desmontable; Casaca tipo saco impermeable; Casaca impermeable Rija; Casaca sport elegante; Casaca acolchada; Casaca softshell. No inventar prestaciones a partir de esos nombres. No crear modelos para familias aún sin recursos ni reutilizar fotos de casos como si fueran referencias individuales aprobadas.

## 8. Casos corporativos y condiciones de publicación

**VERIFICADO EN CÓDIGO:** se evaluaron `isPublishedCase` y `publishedCases` de `lib/uniforms.ts` con los datos del HEAD auditado. Hay seis registros y **cuatro** pasan el filtro:

| Caso | Sector | Estado / filtro | Ruta y evidencia visual |
| --- | --- | --- | --- |
| ISIL | Educación | `published` / true; presentación por cinco funciones | `/uniformes/educacion/isil`; 5 fotos en `public/casos/isil/` |
| Instituto Columbia | Educación | `published` / true; variantes con/sin saco | `/uniformes/educacion/columbia`; 2 fotos en `public/casos/columbia/` |
| Decor Center | Retail | `published` / true; invierno/verano, dama/caballero | `/uniformes/retail/decor-center`; 4 fotos en `public/casos/decor-center/` |
| Avinka Artisan | Retail | `published` / true; presentación editorial | `/uniformes/retail/avinka`; 2 fotos en `public/casos/avinka/` |
| Molino Contreras | Agroindustria | `draft` / false; sin fotos ni historia | No se expone como caso publicado; faltan recursos e historia. |
| Premex | Agroindustria | `draft` / false; sin fotos ni historia | No se expone como caso publicado; faltan recursos e historia. |

El filtro exige estado publicado, sector público, fotos, referencias individuales coherentes si se declaran y condiciones según presentación: roles completos y relato, al menos dos imágenes y relato para editorial/variantes, o temporada con conjunto publicado y relato. No es una auditoría física de archivos, de licencias ni de veracidad comercial. Los casos y sus metadatos se resuelven desde `publishedCases`; los no admitidos terminan en `notFound` (`app/uniformes/[sector]/[caseId]/page.tsx`).

Decor Center, Avinka y Columbia mantienen pendiente la fotografía individual de prendas en sus datos; esto no invalida su publicación como conjuntos. ISIL no tiene pendientes declarados en ese arreglo, lo que no sustituye validación externa.

**DECISIÓN DEL PROPIETARIO:** plan original de **2 educación + 3 retail + 2 agroindustria**, condicionado a evidencia. Los siete no están publicados: hay dos retail registrados/publicables y un tercer caso retail todavía sin registro identificado; no asignarle una marca ni crear contenido sin recursos aprobados.

## 9. Sectores objetivo y rutas

**DECISIÓN DEL PROPIETARIO:** educación privada, salud privada, retail, agroindustria, seguridad privada y HORECA son los seis sectores objetivo.

| Sector | VERIFICADO EN CÓDIGO | Estado |
| --- | --- | --- |
| Educación privada | Identificador `educacion`, nombre actual «Educación», `/uniformes/educacion` | `public: true`; dos casos filtrados. |
| Retail | `/uniformes/retail` | `public: true`; dos casos filtrados. |
| Agroindustria | `/uniformes/agroindustria` | `public: false`, pero la ruta dinámica sí la genera y renderiza; metadata `noindex/nofollow`, fuera del sitemap y de enlaces sectoriales públicos. Dos casos borrador. No confundir ocultación con bloqueo de acceso. |
| Salud privada | Sin entrada en `sectors` ni landing sectorial específica | Pendiente; `/uniformes/scrubs` es una familia/prenda, no esa landing. |
| Seguridad privada | Sin entrada en `sectors` ni landing sectorial específica | Pendiente. |
| HORECA | Sin entrada en `sectors` ni landing sectorial específica | Pendiente. |

Evidencia: `lib/uniforms.ts`, `app/uniformes/[sector]/page.tsx`, `app/uniformes/page.tsx`, `app/sitemap.ts`. La existencia y política de estas rutas se verificó en código, no mediante navegación remota en esta auditoría.

## 10. Separación conceptual obligatoria

**DECISIÓN DEL PROPIETARIO:** **caso sectorial** = uniforme completo de un proyecto empresarial, con contexto, solución y evidencia; **catálogo** = modelos individuales por familia. No son intercambiables.

**VERIFICADO EN CÓDIGO:** `projectCases`/CaseRoles/CaseSeasons soportan conjuntos y proyectos; las páginas de familia presentan modelos. `garments` proyecta los 30 modelos aprobados del registro editorial compartido. No se les asignan casos ni clientes por deducción. No transformar testimonios en casos adicionales (`lib/garment-models.ts`, `lib/uniforms.ts`, `components/uniforms/`).

## 11. Restricciones y gobierno de cambios

**DECISIÓN DEL PROPIETARIO:**

- Las imágenes se generan y aprueban fuera de este flujo. Usar únicamente los recursos definitivos; conservar nombres, encuadres y archivos aprobados. No reinterpretar, regenerar, retocar ni agregar logotipos o marcas de clientes sin autorización específica.
- No alterar decisiones aprobadas de Home ni categorías terminadas para resolver otro catálogo. No introducir instrucciones internas de producción en el contenido público.
- Producción permanece en `main`; desarrollo en `redesign-2027-home`. No hacer merge, cambiar dominio/configuración de Vercel ni desplegar manualmente sin autorización. Un push autorizado a la rama de desarrollo puede activar su integración Git de Preview; no equivale a publicar en producción.
- No realizar migraciones, refactorizaciones o cambios de arquitectura como parte de catálogos o continuidad documental. Preservar cambios locales ajenos.
- No guardar secretos, valores de variables privadas, credenciales, datos personales ni capturas temporales en este documento. La continuidad debe descansar en archivos versionados y evidencia identificable.

## 12. Pendientes priorizados

### Pendientes confirmados por el propietario o los datos

1. **Continuidad documental:** este archivo cubre el hito de documentación; mantenerlo al cerrar hitos relevantes, sin tratar informes anteriores como prueba vigente.
2. **Uniformes y Casacas:** implementación del recorrido y los 30 modelos completada en §16; pendiente aprobación visual final del propietario en Preview.
3. **Uniformes y casos:** completar el alcance sectorial y el plan de casos con evidencia; resolver fotografías individuales pendientes y borradores agroindustriales. El tercer caso retail no está identificado en los datos.
4. **Blog:** rediseño editorial, respetando contenido y estrategia de URLs que se validen antes de cambiar rutas.
5. **Antes de publicar:** revisión integral de UX, SEO, accesibilidad, formularios, analítica y Core Web Vitals; comprobación real de Preview, dispositivos y servicios bajo autorización. No hay medición de CWV de campo acreditada por esta auditoría.

### Oportunidades detectadas, sin corrección autorizada aquí

- Los enlaces de pantalones en Home se corrigen en §16. Sigue pendiente revisar la atribución de contexto del CTA de la ruta antigua `/uniformes/pantalones`, que ya no coincide con ninguna categoría en `garmentCategories` (`lib/contact-context.ts`).
- Validar accesibilidad de controles de pausa ocultos hasta foco, rotación actual de cuatro segundos, anuncios de estados del formulario y estructura de landmarks: `app/layout.tsx` contiene un `main` y varias páginas también devuelven `main`. No se declara incumplimiento medido sin prueba específica.
- Revisar coherencia entre estilos heredados/globales, fuentes Geist aún referenciadas en `app/globals.css`, tokens y módulos editoriales; no es autorización para uniformar estilos o cambiar Home.
- Revisar cobertura de sitemap/metadatos, rutas antiguas y tratamiento de contenido HTML del Blog, política de indexación de Preview y casos no públicos.
- Revisar contratos de respuesta de Resend, validación y abuso de formularios y coherencia de identidad jurídica. No se ha reproducido un fallo externo ni se afirma que exista protección adicional no implementada.

## 13. Registro y alcance de la auditoría

| Dato | Observación |
| --- | --- |
| Fecha | 2026-11-11, referencia de usuario America/Lima. |
| Rama inicial | `redesign-2027-home`, verificada con `git branch --show-current`. |
| HEAD auditado | `f0f25c90a0a318431f880be2aa06ee9b51790d93`, verificado con `git rev-parse HEAD`; base de código anterior al commit de este documento. |
| Árbol inicial | Limpio: `git status --short` no devolvió entradas. No existía `docs/PROJECT-CONTEXT.md`. |
| Remoto consultado | `git ls-remote origin refs/heads/redesign-2027-home refs/heads/main`: la rama remota de desarrollo apuntaba al mismo SHA completo auditado al consultar. No extrapolar igualdad a sesiones futuras. |
| Referencia remota de main | `bae31adc06c5ac95aae500681d9045518e077e5b` en esa consulta; no se cambió de rama ni se modificó producción. |
| Cambio autorizado | Exclusivamente `docs/PROJECT-CONTEXT.md`; commit documental separado sobre la base auditada. Su SHA debe consultarse en Git, no confundirse con el HEAD de código registrado arriba. |

Fuentes revisadas: `package.json`, lockfile, configuración Next/TypeScript/ESLint/PostCSS; rutas `app/`; componentes y módulos CSS; datos y helpers `lib/`; inventario de recursos `public/`; fuentes locales; formulario y ambas API; metadatos, robots y sitemap; `tests/contact-context.test.mjs`; los tres informes de `docs/` citados en §5. Se comprobaron los conteos de catálogos y las dimensiones de los PNG de pantalones, y se evaluó en memoria el filtro de casos con el módulo TypeScript real, sin modificarlo.

Esta es una auditoría de código y documentación: **no** se instalaron dependencias, ejecutaron build/TypeScript/lint, alteraron tests, enviaron formularios ni realizaron despliegues. Las pruebas locales de los hitos previos del chat no se presentan como una nueva validación integral. En esos hitos se obtuvo el enlace de Preview de checks de GitHub, pero el acceso directo a Vercel quedó bloqueado por red; **PENDIENTE DE VALIDACIÓN** su contenido y versión remotos actuales. No certificar disponibilidad, configuración de Vercel ni estado de producción a partir de ese enlace.

Control documental de cierre: comprobar las quince secciones, correspondencia con las fuentes, ausencia de información privada, `git diff --check` y alcance exclusivo del archivo mediante diff/status; después, un solo commit y push únicamente a `redesign-2027-home`, según autorización. No abrir PR ni hacer merge. La salida de Git del cierre es evidencia del commit/push; este registro describe la base auditada.

## 14. Próximo trabajo

**DECISIÓN DEL PROPIETARIO:** revisar visualmente el recorrido reestructurado de Uniformes y el catálogo genérico de Casacas en Preview. Cualquier familia posterior requiere recursos y alcance aprobados; Polos, Chalecos y Sacos permanecen pendientes. No generar imágenes ni inventar modelos, prestaciones o asociaciones con clientes.

## 15. Protocolo de continuidad

1. Al iniciar una sesión, leer `docs/PROJECT-CONTEXT.md`, comprobar rama, HEAD y árbol de trabajo. Usar el checkout existente; no crear otro flujo de ramas o despliegues por iniciativa propia.
2. Comparar el HEAD actual con el SHA auditado de §13 mediante `git log` y `git diff`; si se necesita afirmar sincronía remota, consultar el remoto de nuevo. Conservar trabajo ajeno y aplicar las instrucciones actuales del propietario.
3. Leer los archivos de la parte afectada; usar informes históricos como contexto y contrastarlos con el código. Mantener separados los cuatro niveles de evidencia definidos arriba.
4. Confirmar recursos y alcance antes de implementar una familia o caso. No publicar borradores ni atribuir modelos genéricos a clientes.
5. Actualizar este documento **únicamente al cerrar hitos relevantes**, corrigiendo estados y evidencia sin destruir decisiones válidas. Registrar la nueva base de código, fecha, cambios posteriores y límites de validación; evitar convertir una aprobación previa de un push en autorización permanente para producción.

## 16. Hito — recorrido de Uniformes y 30 modelos compartidos

**DECISIÓN DEL PROPIETARIO:** HOME → UNIFORMES → PRENDAS FILTRABLES → SECTORES → CASOS DE ÉXITO. Prendas es una sección de Uniformes, no un elemento principal ni una página nueva. Base de la intervención: `be071dd1a01fcf87f3e061040e820f64512c614d`, comprobada local y remotamente en `redesign-2027-home`, árbol inicial limpio. Fecha: 2026-11-11 (America/Lima).

**VERIFICADO EN CÓDIGO:**

- Fuente única de 30 modelos en `lib/garment-models.ts`: Camisas 5, Blusas 7, Pantalones de dama 6, Pantalones de caballero 6 y Casacas 6. Las páginas editoriales usan esos mismos datos, sin copias manuales. Se preservan las canónicas y los contenidos aprobados de las primeras cuatro familias.
- `Catalog.tsx` muestra fotografías definitivas, nombres genéricos, descripción, enlace a la familia/ancla de modelo y consulta contextual. Todas muestra 30; cada categoría filtra su propio conjunto y anuncia su conteo. Polos, Chalecos y Sacos muestran preparación explícita y consulta, sin fotos heredadas.
- `/uniformes` presenta introducción, catálogo, requerimientos completos, Educación/Retail y contacto final. Se retiran los atajos a clientes y las asociaciones de casos desde tarjetas genéricas. Los cuatro casos y sus datos no cambian; los borradores siguen excluidos por `publishedCases`.
- Casacas separa nombre genérico, características observables y aplicación comercial. Se eliminan atribuciones de clientes del contenido visible, alt y textos SEO. Los identificadores de los archivos originales y los logotipos dentro de las fotografías se conservan; no equivalen a texto comercial nuevo ni a casos nuevos.
- Header, Hero, carruseles, eventos de conversión, formularios y API permanecen sin cambios. En Home se corrigen solo los dos destinos heredados de pantalones. Se elimina el `main` anidado de las cinco páginas editoriales afectadas, conservando el contenedor `main` global y la composición visual.
- Sitemap revisado: las cinco familias y los cuatro casos ya estaban incluidos; solo sectores públicos. No se borran rutas, añaden redirecciones ni cambia la configuración de indexación de Preview.

**VALIDACIÓN LOCAL DEL HITO:** build correcto (136 páginas estáticas), TypeScript y lint sin errores; ocho pruebas con transportes simulados, incluidas las seis anteriores y dos controles de catálogo/copy/contexto. Comparación con la base: los 24 modelos anteriores preservan todos sus datos normalizados y las 30 imágenes coinciden con sus originales versionados. Revisión Chromium a 1440, 768, 390 y 320 px: recorrido, filtros, teclado, tacto, fotografías completas, enlaces de familia, sectores/casos, metadatos, landmarks afectados y guarda del formulario sin envío. Las pruebas de navegación se registran al cerrar el hito; no constituyen pruebas de correo/captcha real ni CWV de campo.

**PENDIENTE DE VALIDACIÓN REMOTA:** estado y contenido del despliegue automático asociado al commit final. Los accesos previos a Vercel devolvieron un bloqueo de proxy 403, que no demuestra fallo del sitio. El informe de entrega identifica el SHA, los checks y los enlaces observados, sin afirmar disponibilidad remota sin comprobarla. No hay despliegue manual, PR, merge a main ni cambios de configuración de Vercel. La aprobación visual final corresponde al propietario.
