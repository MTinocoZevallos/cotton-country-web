# Blog Cotton Country 2027: intervención y evidencia

Fecha editorial: 12 de noviembre de 2026 (America/Lima). Rama exclusiva: `redesign-2027-home`. Base: `c81d52c2f73612cf08554692e47cc3ed4a85db67`. El SHA de cierre se obtiene de Git; este documento registra la base y no pretende anticiparlo.

Listado exacto de archivos de esta intervención: [archivos-modificados.txt](archivos-modificados.txt).

## Alcance y preservación

Se conservaron los 53 slugs y sus 53 canonical en la raíz. Los 18 artículos autorizados recibieron revisión editorial, extractos y una fecha de revisión real (`2026-11-12`). No se asignaron fechas de publicación desconocidas ni autorías personales. Los otros 35 objetos originales —incluidos título, extracto y contenido— se preservaron íntegramente y se comprueban por SHA-256 en `tests/fixtures/blog-preserved-35.json`.

El cambio técnico afecta a la representación, navegación y metadatos de los 53. Los enlaces heredados dentro de los 35 se normalizan al representarlos, sin modificar sus textos guardados. El HTML del contenido se sustituyó por nodos React con un intérprete restringido de párrafos, títulos, listas, énfasis y enlaces. Solo el JSON-LD usa inserción de texto serializado, escapando `<` para impedir cierres de script.

Se centralizaron 53 recursos fotográficos con sus dimensiones reales y textos alternativos basados en inspección visual. Se prefieren las versiones WebP existentes en los tres casos con duplicados PNG/WebP. No se generaron ni modificaron fotografías. Tres portadas originales tienen solo 400 px de ancho; no se les atribuye detalle de alta resolución inexistente.

La portada incorpora destacado, cinco categorías, revisiones recientes, biblioteca paginada y recomendaciones. Las plantillas de lectura incluyen categoría, portada, introducción, índice cuando hay suficientes subtítulos, lecturas relacionadas y contacto discreto. No se añadieron carruseles, dependencias al producto ni cambios a Home, Uniformes, formularios o navegación principal.

## Canonical y redirecciones

La evidencia de las rutas raíz está en los `canonicalPath` originales de los 53 registros y en el sitemap de la base. Esa evidencia del repositorio es suficiente para conservar dichas rutas; no equivale a un inventario externo completo de WordPress ni acredita por sí sola cuál fue la URL original de cada publicación desde 2019.

| Solicitud identificada | Respuesta local | Destino |
| --- | --- | --- |
| `/<slug-conocido>` | 200 | Canónica existente, sin cambiar el slug |
| `/blog/<slug-conocido>` | 308, un salto | `/<slug-conocido>` |
| `/blog/<slug-conocido>/` | 308, un salto | `/<slug-conocido>` |
| `/<slug-conocido>/` | 308, un salto | `/<slug-conocido>` |
| `/blog` y categorías/páginas válidas | 200 | Canonical propio; las páginas posteriores incluyen `?pagina=N` |
| URL sin artículo equivalente o categoría/página inválida | 404 | No se redirige al Home |

El detalle de los 53 registros, imágenes y hashes está en [inventario-53.csv](inventario-53.csv). Las 159 variantes comprobadas están en [auditoria-local.json](auditoria-local.json). `next.config.ts` desactiva la regla automática previa a los redirects para resolver primero los alias conocidos; la última regla reproduce la normalización anterior de barra final para las demás rutas. No se añadieron redirecciones de hostname, protocolo, fechas WordPress o identificadores `?p=` sin correspondencia demostrada.

## Los 18 artículos revisados

### Tallaje

1. `que-significa-tallas-completas-en-ropa`
2. `una-ia-nos-da-tablas-de-medida-para-el-mercado-peruano`
3. `ntp-para-la-designacion-de-tallas`
4. `la-talla-peruana`
5. `las-tallas-completas-segun-una-ia`
6. `el-problema-de-las-tallas`

### Algodón y marca

7. `una-breve-historia-del-algodon`
8. `el-algodon-se-caso-con-el-poliester-en-oxford`
9. `dia-mundial-del-algodon-2026`

### Industria y materiales

10. `5-tipos-de-tejidos-inteligentes`
11. `que-caracteristicas-deben-tener-los-uniformes-de-seguridad-industrial`
12. `logistica-y-abastecimiento-textil-2022`
13. `el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil`

### Uniformes y compras

14. `el-uniforme-de-farmacia`
15. `uniformes-de-chef-que-tela-elegir`
16. `compras-comerciales-vs-compras-industriales-por-que-fabricar-uniformes-a-pedido-es-la-mejor-opcion`
17. `como-definir-un-proyecto-de-uniformes-corporativos`
18. `de-que-depende-el-tiempo-de-entrega-de-uniformes`

Se retiraron las tablas numéricas de IA sin estudio identificable, las afirmaciones no respaldadas de talla nacional única, garantías universales de ajuste o protección y predicciones climáticas presentadas como hechos. Se conserva la intención de búsqueda y se explican criterios prácticos. Logística 2022 distingue su contexto histórico del mercado actual. No se afirma una edición vigente de una norma que no se pudo contrastar ni se añaden enlaces externos nuevos presentados como verificados.

## Auditoría local y reproducción

Con el build en ejecución:

```sh
npm run build
npm run start -- --hostname 127.0.0.1 --port 3119
python scripts/audit-blog.py --base-url http://127.0.0.1:3119
node --test tests/*.test.mjs
npm run lint
npx --no-install tsc --noEmit
```

El recorrido comprueba las 53 canónicas, descubrimiento desde portada/categorías, 159 redirecciones directas, destinos internos, fragmentos, recursos de imagen originales/optimizados, sitemap, metadatos, JSON-LD y controles 404. El JSON registra los conteos y fallos reales. La comprobación de enlaces se limita a destinos observados en el blog y no es una auditoría general del sitio.

La revisión responsive usa Chromium a 1440, 768, 390 y 320 px, con cinco páginas representativas: portada, categoría, artículo revisado, artículo original largo y título original largo. [accesibilidad-local.json](accesibilidad-local.json) conserva resultados de axe-core sobre el contenido principal. Las comprobaciones automáticas no sustituyen una revisión manual exhaustiva con todas las tecnologías de asistencia.

[rendimiento-local.json](rendimiento-local.json) contiene dos mediciones móviles de laboratorio con Lighthouse. No equivale a métricas de campo ni certifica Core Web Vitals para los 53 artículos. INP no se midió; TBT es un indicador de laboratorio diferente. El primer diagnóstico se conserva en [rendimiento-inicial.json](rendimiento-inicial.json) y coincidió con otras pruebas locales, por lo que no constituye una comparación controlada. Lighthouse se instaló únicamente como herramienta temporal en `/tmp`, sin añadir dependencias al proyecto. El bloqueo de Google Tag Manager por la red del entorno afecta al apartado de buenas prácticas; no se alteró la integración global para modificar el resultado.

## Historia de WordPress, Search Console y límites remotos

[verificacion-remota.json](verificacion-remota.json) registra 16 variantes representativas de HTTP/HTTPS, www/sin www, barra final y alias, además de cuatro fuentes oficiales consultadas (ONU, INACAL, ENFEN y SENAMHI). Las 20 comprobaciones quedaron bloqueadas por la política de red del entorno. Un 403 del proxy o un fallo `CONNECT 403` no demuestra un fallo del sitio de origen ni permite comprobar sus redirecciones reales.

No se aportaron exportación de WordPress, inventario completo de URLs históricas, registros del servidor, datos de Search Console o listado concreto de URLs de apuestas/casinos. La inspección del repositorio base no identificó publicaciones de ese tipo ni reglas que las enviasen al Home. Los ejemplos inexistentes usados en pruebas son controles negativos, no URLs extraídas de Search Console. No hay evidencia suficiente para afirmar una vulneración actual ni para atribuir el origen de esas señales.

Pendiente de evidencia externa:

- Correspondencias de permalinks con fecha, `?p=`, adjuntos o antiguos recursos `wp-content` que no aparecen en el repositorio.
- Comportamiento real del dominio y sus variantes de protocolo/hostname.
- URLs sospechosas concretas y su historial de rastreo/indexación.
- Verificación vigente de las referencias normativas o boletines que deban citarse con edición, fecha o enlace externo.
- Disponibilidad y contenido del despliegue automático de Vercel y posterior evolución de indexación y posicionamiento.

No se declara recuperado el posicionamiento ni resueltos todos los problemas históricos de WordPress. El cierre acredita la intervención y las verificaciones locales indicadas, conservando los límites de la evidencia disponible.

## Resultados del cierre local

- 53/53 artículos con respuesta 200, canonical raíz coherente y `BlogPosting` válido.
- 53/53 descubribles desde portada/categorías; 11 vistas de colección recorridas.
- 159/159 variantes con redirección permanente directa, sin bucles ni cadenas.
- 75 destinos internos y 197 fragmentos válidos; 106 recursos de imagen comprobados; cero fallos en el recorrido.
- Ocho controles de rutas inexistentes con 404, sin redirección al Home.
- 13 pruebas unitarias, lint, TypeScript y build de producción satisfactorios.
- 20 muestras de contenido principal revisadas con axe-core: cero infracciones detectadas. Revisión visual y de navegación a 1440, 768, 390 y 320 px.
- Lighthouse móvil final, en dos muestras aisladas: rendimiento 92/94, accesibilidad 100/100, SEO 100/100 y buenas prácticas 96/96. CLS 0 en ambas; TBT aproximadamente 42 ms; LCP aproximadamente 3,3 s en portada y 3,0 s en artículo. Estas muestras no alcanzan el umbral orientativo de LCP bueno de 2,5 s y no constituyen una aprobación de Core Web Vitals de campo.
- Se desactivó la precarga de navegación de los enlaces del Blog para evitar solicitudes RSC anticipadas de artículos que el lector aún no eligió; la imagen destacada tiene prioridad alta y las imágenes de lectura no compiten mediante una precarga indiscriminada.

Los valores detallados y sus límites se conservan en los JSON enlazados. La disponibilidad remota del commit final se consulta al cerrar Git; no se afirma que un check de comentarios de Vercel demuestre un despliegue listo.
