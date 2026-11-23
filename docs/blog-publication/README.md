# Publicación aislada de los artículos 54–57

## Alcance y conservación

Base: `main` en `de674f99849a82a896f7011898bf2576d65a7c03`. Fuente aprobada: `redesign-2027-home` en `52f611e2573cfa20abf3cc0f10b15a4a5dfc40fa`. Rama independiente: `publish/blog-54-57`. No fusionar todavía: requiere autorización final del propietario.

Los 57 registros completos y el manifiesto de imágenes se compararon con la fuente aprobada. Los 53 históricos conservan texto, título, fecha, slug, canonical, imagen y recomendaciones de `relatedPosts()`. Las cuatro entradas nuevas conservan exactamente sus versiones finales aprobadas. No tienen fecha de publicación proporcionada; no se sustituye por la fecha del commit ni la actual. No hay cambios de Home, Hero, Uniformes, Sectores, Casos de éxito, formularios, navegación general, integraciones, dependencias o configuración de despliegue.

**Discrepancia documental:** existen tres portadas WebP aprobadas (54–56). La portada del 57 es `alta-visibilidad/prendas-vistas.svg`, con PNG equivalente para Open Graph. También contiene los SVG de clases ISO y tipos ANSI. Todos se conservan byte por byte, completos y sin recortes. No se genera un WebP inexistente ni se ejecuta el generador de gráficos.

## A. Enlaces

- `enlaces-57.csv`: inventario de enlaces del cuerpo interpretados por el parser, las tres lecturas relacionadas de cada artículo y navegación complementaria. Las rutas históricas reconocidas se normalizan con el mecanismo ya existente; no se reescriben los cuerpos.
- Se añaden ocho enlaces, únicamente fuera del cuerpo aprobado, en cinco artículos: historia del algodón → 54; Oxford → 54 y 56; consejos para compradores B2B → 55 y 56; definición de proyecto → 55 y 56; seguridad industrial → 57. Se reutilizan estilos y enlaces accesibles existentes, sin un nuevo sistema visual.
- `relatedPosts()` mantiene las 53 recomendaciones históricas y las asociaciones aprobadas de los cuatro nuevos; sin duplicados ni enlaces a sí mismos. No se multiplican enlaces recíprocos suplementarios.
- `oportunidades-pendientes.csv`: trece conexiones para revisión individual, incluyendo páginas comerciales relevantes. **No se insertaron en los cuerpos ni se modificaron esas páginas.**
- La biblioteca conserva su orden por fecha original; los cuatro nuevos sin fecha están accesibles en `/blog?pagina=5#biblioteca` y en sus categorías. No se altera Home para destacarlos artificialmente.
- Los destinos externos normativos del artículo 57 se conservan; el proxy del entorno impide confirmar su respuesta remota. No se atribuyen certificaciones ni se reabre la revisión editorial aprobada.

## B. Imágenes y estándar futuro

`imagenes-desde-2025.csv` contiene los siete artículos históricos publicados desde 2025, con fecha, ruta, formato, dimensiones reales, proporción, bytes y recomendación. `imagenes-aprobadas-54-57.csv` separa los cuatro nuevos, cuyas fechas no fueron proporcionadas. `inventario-editorial-53.csv` registra todas las imágenes históricas, incluidas las no visibles por decisión previa.

Estándar para próximas fotografías editoriales: `public/blog/[slug].webp`, horizontal 16:9, objetivo 1600×900, compresión con comprobación visual, sin ampliación artificial, textos incrustados, marcas de agua ni logotipos inventados. No es una orden de recorte para archivos históricos o gráficos técnicos.

Las portadas actuales usan ancho responsive y altura automática con `object-fit: contain`; las tarjetas tienen marco 3:2 y `object-fit: cover`. No deforman imágenes, pero las tarjetas pueden recortar bordes. Una futura excepción con `contain` dentro del mismo marco protegería composiciones técnicas/cuadradas sin alterar la cuadrícula; **no se aplica un cambio global en esta publicación**. Se mantienen las imágenes aprobadas tal como estaban. El 57 ya incluye acceso a la lámina completa. Evaluar individualmente cualquier ajuste de tarjeta antes de publicarlo.

Las recomendaciones de recorte son conservadoras y requieren aprobación visual individual; no se ejecuta ninguna. El peso del archivo fuente no equivale al transferido por `next/image`, que ya ofrece tamaños adaptativos. La imagen de entregas, 6240×4160, es candidata a reducir resolución en una revisión futura; las composiciones con información junto a bordes deben conservarse.

## C. Validación

Build de producción, TypeScript, ESLint y 46 pruebas automatizadas, incluyendo fidelidad al DOCX histórico, fechas, alias, metadatos, tablas, imágenes y simulaciones del formulario. No se envían correos reales.

La comprobación en Chromium contra build local queda registrada en `verificacion-local.json`: rutas de los 57 artículos, canonical, BlogPosting, imágenes, enlaces internos y fragmentos; sitemap con 57 entradas; alias históricos y nuevos; cuatro artículos a 320, 390, 768 y 1440 px, tablas y láminas completas, sin desbordamiento de página. Las pruebas locales bloquean servicios externos: no equivalen a verificación de conversiones o servicios de producción.

`metadatos-57.json` permite revisar títulos, categorías, fechas, canonical, imágenes sociales, alt y encabezados. Los metadatos sociales usan las imágenes correspondientes y URL absolutas. La política de robots de Preview del blog ya existente se conserva.

## D. Dependencias indispensables

| Archivos | Justificación |
| --- | --- |
| `app/blog/posts.ts` | Añadir los cuatro registros aprobados y campo opcional de numeración; sin alterar los 53 registros. |
| `lib/blog/images.ts`, `lib/blog/taxonomy.ts` | Registrar exclusivamente portadas y categorías nuevas. |
| `lib/blog/index.ts` | Lecturas relacionadas de los cuatro nuevos; conserva las históricas. |
| `lib/blog/content.ts` | Tablas Markdown optativas únicamente para 55–56; parser histórico por defecto intacto. |
| `components/blog/Article.tsx`, `BlogCard.tsx`, `Content.tsx` | Render de artículos nuevos sin fechas inventadas, tablas optativas y navegación complementaria fuera del cuerpo. |
| `HighVisibilityContent.tsx` y dos módulos CSS específicos | Tablas y gráficos técnicos del 57, tablas responsive de 55–56; estilos acotados. |
| `public/blog/` (siete recursos nuevos) | Tres WebP, tres SVG y copia PNG social aprobados, bytes originales. |
| `lib/blog/reading-links.ts` | Ocho conexiones temáticas suplementarias, máximo dos por artículo seleccionado. |
| Scripts y pruebas del blog | Integridad de los 53 históricos y cuatro aprobados, inventarios y pruebas de navegación. Generador técnico copiado solo como trazabilidad; no se ejecuta. |
| `docs/blog-publication/` | Inventarios y evidencia de alcance para revisión del PR. |

Sitemap, canonical, rutas dinámicas, infraestructura social, fuentes y redirecciones ya existen en `main`: no requieren copiar cambios ajenos del rediseño. La configuración existente genera automáticamente los ocho alias de los cuatro nuevos; conserva las 111 reglas históricas y ocho variantes comerciales aprobadas (127 reglas totales). No se cambia `next.config.ts`, sitemap ni configuración externa.

## E. Revisión futura

`inventario-editorial-53.csv` conserva los 53 títulos, fechas y categorías; incluye imágenes, enlaces existentes, oportunidades y observaciones de formato para revisar uno a uno. La ausencia de encabezados se registra como oportunidad, no como fallo ni permiso para reescribir. No se inventan prioridades de tráfico, rankings ni métricas de Search Console.

La publicación queda preparada técnicamente para revisión del alcance. El merge y la publicación en producción continúan pendientes de autorización final. El estado real del PR y Preview se registra en `estado-remoto.md`; no se declara validación remota si Vercel responde 403 CONNECT.
