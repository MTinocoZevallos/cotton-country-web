# Artículos 54–57 — revisión editorial y técnica

Fecha: 22/11/2026 (America/Lima). Rama: `redesign-2027-home`. Base final: `de674f99849a82a896f7011898bf2576d65a7c03`, que ya estaba aprobada en `main`. La rama de rediseño partía de `9645d6b`; se incorporó la base aprobada antes de cerrar la entrega para conservar Hero, rendimiento y Open Graph. No se modifica ni se publica `main`.

## Integración

| Nº | Slug canónico | Categoría existente | Imagen de portada |
| --- | --- | --- | --- |
| 54 | `/que-significa-algodon-24-1-30-1` | Algodón y cultura textil | Pendiente: imagen aprobada para el artículo sobre títulos 24/1 y 30/1 |
| 55 | `/por-que-encogen-las-telas` | Industria y materiales | Pendiente: imagen aprobada para el artículo sobre encogimiento |
| 56 | `/por-que-destinen-los-uniformes` | Industria y materiales | Pendiente: imagen aprobada para el artículo sobre solidez del color |
| 57 | `/ubicacion-cintas-reflectivas-uniformes` | Uniformes y aplicaciones | SVG original con las vistas anterior/posterior de seis prendas |

Se reutilizan `app/blog/posts.ts`, `getPostImage`, la taxonomía, plantilla, listado, paginación, recomendaciones y sitemap existentes. No se crean rutas paralelas: el patrón raíz ya existente genera las cuatro páginas; los alias `/blog/<slug>` y las variantes con barra redirigen directamente a la raíz.

Los textos de 54–56 se conservan literalmente. Solo se recuperan encabezados Markdown. El 57 conserva su copy; sus dos marcadores internos de inserción se sustituyen por los cuadros en los puntos indicados, nunca se muestran al visitante. Las cinco verificaciones se representan como lista ordenada normalizando exclusivamente su marcador Markdown. El test de texto compara todas las palabras con la transcripción aprobada (`tests/fixtures/blog-54-57-approved.json`).

Los 53 registros anteriores, incluyendo contenido, títulos, extractos, fechas, canonical e imágenes, permanecen idénticos. Sus recomendaciones se comparan también con una instantánea independiente de la base; no cambian. Los artículos nuevos tienen enlaces relacionados pertinentes sin insertar palabras nuevas en su texto aprobado.

No se proporcionaron fechas de publicación para las cuatro incorporaciones: se omiten `publishedAt` y `updatedAt`, sin inventar fechas por el commit o el día de trabajo. Se conservan la secuencia y paginación de los 53; las cuatro incorporaciones sin fecha se encuentran al final de la biblioteca, en `/blog?pagina=5#biblioteca`, además de sus categorías. La plantilla no las presenta como publicaciones históricas.

El sitemap incorpora automáticamente las cuatro URLs una vez. Título, descripción, canonical, Open Graph, Twitter y BlogPosting se generan mediante los mecanismos existentes, sin fechas fabricadas. Preview conserva su política de noindex, sin trasladarla a Production.

## Imágenes y SVG

La inspección del repositorio y de los materiales de proyecto disponibles no encontró las tres portadas aprobadas de 54–56. Sus registros se marcan explícitamente `pendingApproval: true`, sin URL ficticia ni imagen sustituta. No se muestra un aviso interno de trabajo en el contenido público. La portada se omite y Open Graph utiliza la tarjeta de marca ya aprobada en la base; esto no sustituye la fotografía editorial pendiente. No se inventan descripciones alternativas para fotos que no se han visto.

Se crearon tres láminas originales y editables, sin fotografías, personas, logos, códigos comerciales ni gráficos copiados de 3M:

- `clases-iso.svg`, 1200 × 600: comparación relativa de mínimos de material para clases 1/2/3 mediante bloques, sin asignar clase a siluetas de prendas.
- `tipos-ansi.svg`, 1200 × 600: contextos O/R/P mediante iconos geométricos originales, sin convertir tipos en categorías de prenda.
- `prendas-vistas.svg`, 1000 × 1560: chaleco, casaca, polo de manga corta, polo de manga larga, pantalón y conjunto; cada uno de frente y espalda. Fondo amarillo/naranja y retrorreflectivo gris. Ninguna prenda recibe una clase o certificación.

Los SVG incluyen título y descripción accesibles, dimensiones intrínsecas y enlaces para ampliar. La lámina de prendas funciona como portada; las otras dos se integran con los cuadros. No se repite la misma lámina en dos lugares del artículo. Una copia PNG de la portada (`prendas-vistas.png`, mismas dimensiones) se usa para las imágenes sociales y los datos estructurados, evitando servir SVG a redes que no lo admitan. Los originales editables permanecen en el proyecto.

Reproducción de SVG: `python scripts/generate-high-visibility.py`. Reproducción del PNG: `node -e "require('sharp')('public/blog/alta-visibilidad/prendas-vistas.svg').png().toFile('public/blog/alta-visibilidad/prendas-vistas.png')"`.

## Cuadros y cautelas normativas

Hay exactamente tres tablas HTML: comparación ISO/ANSI y tipos O/R/P antes de «¿Qué significan las clases 1, 2 y 3?»; mínimos ISO después del párrafo «Clase 3: establece…». Se conservan las cifras y notas aprobadas, incluida la advertencia de que superficie y cinta por sí solas no acreditan una clasificación.

Cada tabla tiene caption, encabezados de columnas y filas, región con nombre y nota asociada, foco de teclado y desplazamiento horizontal dentro de su región en móvil. Estilo blanco y divisores finos, sin colorear clases como si fueran niveles certificados.

**Pendiente de contraste normativo independiente:** los tres enlaces facilitados devolvieron `curl: (56) CONNECT tunnel failed, response 403`: ISO, ANSI Webstore y el PDF de 3M. No se pudo verificar la edición vigente, abrir el texto íntegro ni comprobar el contenido del PDF. Se mantuvieron los valores aportados por el propietario; no se presentan como datos verificados externamente por esta ejecución. No se utilizó una guía 2010 como autoridad ni se copiaron sus diagramas.

Se verificaron dimensiones de los archivos, integridad de los SVG y coherencia visual de las dos vistas. Esto no comprueba superficies físicas, anchos/separaciones normativos, continuidad lateral de 360 grados, desempeño fotométrico, resistencia al lavado ni conformidad del conjunto. Todas las prendas son esquemas sin escala y sin clase atribuida. La revisión técnica debe cerrarse antes de presentar un diseño real como conforme a una clase.

## Verificaciones

- Build: correcto, 151 páginas generadas.
- TypeScript y lint: correctos.
- 42 pruebas automatizadas: correctas. Conservación íntegra de los 53 artículos y recomendaciones; transcripción de los cuatro nuevos; tres tablas en los lugares aprobados; mínimos; SVG; portadas pendientes; SEO, fechas, sitemap, redirecciones y pruebas existentes de formulario con transportes simulados.
- Las reglas históricas no se modifican. El mecanismo existente añade ocho alias de blog para las cuatro publicaciones (127 reglas totales frente a 119); los 111 alias históricos y ocho comerciales siguen intactos.
- Chromium: cuatro artículos a 1440, 1024, 768, 390 y 320 px; H1 y texto visible literales, sin desbordamiento de página, índice y canonical correctos, imágenes reales decodificadas, tablas accesibles y con scroll interno.
- Axe WCAG A/AA: doce muestras, cuatro artículos a 1440, 390 y 320 px.
- HTTP local: 57 artículos 200, 175 variantes normalizadas, sitemap con cada artículo una vez, cinco páginas de biblioteca y categorías accesibles. No hay solicitudes de portada a una URL vacía ni imágenes arbitrarias para 54–56.
- Capturas y resultado del recorrido: archivos de este directorio. No son verificación visual remota de Vercel.

## Revisión remota

Se solicita un único PR `redesign-2027-home` → `main`, sin merge. Al consultar GitHub, la API devolvió `Post "https://api.github.com/graphql": Forbidden`; no se cambia autenticación ni se solicitan credenciales. Si la creación sigue bloqueada, la entrega distingue el enlace de comparación de un PR real.

El Preview debe corresponder al commit final de la rama. La entrega informa la URL observada en GitHub/Vercel y cualquier bloqueo, sin afirmar Ready ni renderizado remoto si no se comprobaron. No hay despliegue manual, cambio de dominios, variables ni integraciones. Production queda fuera de esta entrega.
