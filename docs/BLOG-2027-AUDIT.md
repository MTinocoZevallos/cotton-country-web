# Blog Cotton Country 2027 — restauración original y validación técnica

Fecha: **18/11/2026, America/Lima**. Rama exclusiva: `redesign-2027-home`. Base: `1949debe825765557892c90eb79bedfa4c54d60a`.

## Resultado vigente

**53/53 artículos restaurados desde el Word y 53/53 con integridad textual comprobada**, tanto en los datos como en el DOM renderizado por Chromium. Se conservan los 53 slugs y las 53 fechas originales del propietario. No se conserva ninguna reescritura anterior como fuente editorial. No se han corregido afirmaciones, cifras, tiempos verbales ni errores del original.

Esta intervención sustituye los criterios editoriales del informe anterior, incluidas las excepciones de los cinco artículos reescritos. Los archivos `editorial-baseline-d610d0e.json`, `word-witnesses.json` y las antiguas fixtures editoriales se conservan como antecedentes; no gobiernan el texto publicado. La instrucción vigente autoriza restaurar exclusivamente el Word y aplicar presentación semántica, enlaces y SEO técnico.

## Fuente y correspondencia

Fuente completa versionada: [BLOG - COTTON COUNTRY.docx](<blog-2027/source/BLOG - COTTON COUNTRY.docx>).

SHA-256: `7b39c05f2608e4f7cd9503eaa8dba1c99a465e9cdf430a1b59a55c131de69735`.

Se lee el XML de Word en su orden real, incluidas sus dos tablas; no se separan las tablas del párrafo que les corresponde. Hay 53 entradas con slug, 43 relaciones externas y ninguna imagen incrustada. Se conservan las imágenes existentes de las 53 publicaciones, sin cambiar archivos fotográficos ni ampliar las fotografías de baja resolución.

Solo se excluye el contenedor documental: numeración de artículos, campos `slug` y `Contenido:`, la etiqueta vacía ` - Foto:` del título 33 y los dos delimitadores de objeto pegados al final del artículo 53. Las tres últimas exclusiones se registran en `word-source.json`; ninguna corresponde a un párrafo editorial. Se preservan incluso las líneas de puntuación y los comentarios originales de contenido del documento.

La variante documental `el-nino-2026-2027-impacto-industria-textil-peru` se corresponde con la canónica histórica existente `el-fenomeno-del-nino-y-su-impacto-en-la-industria-textil`. Se conserva el alias ya implementado y no se cambia ninguna redirección.

El artículo «Guía de tallas Online» menciona una tabla de camisa que no está en el Word. Se conserva su texto original completo y no se inventa la tabla. Las dos tablas efectivamente presentes pertenecen al experimento de ChatGPT y se restauran celda por celda.

## Control reproducible de integridad

Archivos:

- `scripts/blog_word_source.py`: extrae directamente del DOCX la transcripción, los bloques y las relaciones, sin redacción generada.
- `docs/blog-2027/word-source.json`: transcripción verificable de los 53 originales, con sus ubicaciones XML.
- `scripts/blog_integrity.mjs`: regenera la transcripción desde el Word y exige igualdad con el archivo almacenado; después compara las 53 publicaciones usando el parser real del sitio.
- `docs/blog-2027/word-integrity.json`: resultado individual y hash SHA-256 del texto normalizado de cada artículo.
- `scripts/blog_verify_published.mjs`: compara también el texto efectivamente renderizado en el navegador con el Word, en los cuatro anchos.

La comparación conserva palabras, mayúsculas, signos, cifras y orden. Solo normaliza Unicode NFC y espacios; retira el marcado de presentación y enlaces. Solo se omiten dos H2 añadidos y expresamente declarados: «Cotton Country conversa con ChatGPT», uno en cada conversación. No se utiliza una expresión genérica para borrar encabezados o comentarios arbitrarios. Se verifican por separado los títulos H1 originales y las 53 fechas.

Las pruebas negativas comprueban que se detectan una frase añadida, la eliminación de un párrafo, una palabra sustituida y la modificación de una cifra de tabla. No se presenta una coincidencia parcial ni una revisión manual como integridad completa.

Reproducción de datos (Node, dependencias instaladas y Python 3 estándar):

```sh
node scripts/blog_integrity.mjs
node --test tests/*.test.mjs
```

Reproducción en navegador: ejecutar antes `npm run build` y `npm run start -- --port 3151`; requiere Playwright, Chromium y axe-core disponibles en el entorno de pruebas, sin añadir dependencias al sitio:

```sh
BLOG_TEST_ORIGIN=http://127.0.0.1:3151 node scripts/blog_verify_published.mjs
```

## Maquetación y SEO técnico

- Un H1 original por artículo; 151 H2 y 12 H3 en los cuerpos, sin saltos jerárquicos H1→H3. Los cuatro encabezados principales del artículo 47, importados como H3, pasan a H2 sin cambiar sus palabras.
- Dos H2 de navegación añadidos para las conversaciones; los restantes encabezados proceden de texto existente. Quince artículos no necesitan subtítulos y no se les fuerzan.
- Índice de lectura disponible cuando hay encabezados: 163 destinos comprobados. No se añaden párrafos para crear enlaces o insertar palabras clave.
- Listas y dos tablas semánticas, cabeceras de columna/fila y desplazamiento horizontal accesible en móvil. Se conservan ambas conversaciones, incluidas las etiquetas originales y el párrafo posterior a la conversación de tablas. Se retiran advertencias, subtítulos y leyendas de tabla añadidos en intervenciones anteriores.
- Se retira la leyenda añadida a la fotografía del artículo de algodón de 2026; la fotografía permanece.
- Los 53 `updatedAt` se omiten: la restauración técnica no es una revisión editorial. En pantalla aparece únicamente la fecha original; `BlogPosting` no atribuye una fecha de modificación ficticia y el sitemap usa las fechas originales.
- Títulos SEO y descripciones únicos, fieles al contenido recuperado. Las descripciones se extraen de los párrafos originales y pueden truncarse en metadatos. Los cuerpos no se resumen. Canonical, Open Graph y `BlogPosting` coinciden con las rutas históricas.
- Los enlaces contextuales usan palabras ya existentes. Las menciones enlazadas de SizeSet mantienen su grafía original y apuntan a `https://sizeset.com`.
- Se conservan las etiquetas originales de seis enlaces a antiguos productos `/mascarillas/` y `/bioseguridad/`, pero se retira su enlace porque no existe una ruta equivalente publicada en este proyecto. No se inventan páginas ni destinos. Los enlaces que solo contienen espacios se muestran como espacios sin crear controles vacíos; los enlaces de referencia con texto permanecen.
- 128 enlaces de cuerpo renderizados; 42 destinos internos únicos de cuerpo y 11 externos únicos. Las lecturas relacionadas y los menús completan 56 destinos internos comprobados por HTTP. La disponibilidad de los destinos externos no se certifica desde este entorno.
- La prueba de `VERCEL_ENV=preview` mantiene los metadatos `noindex, nofollow` del blog y no altera la indexabilidad configurada para producción. No equivale a verificar headers remotos ni indexación en Google.

## Verificaciones ejecutadas

| Comprobación | Resultado |
|---|---|
| Word → datos publicados | 53/53 completos e idénticos tras normalización permitida |
| Word → texto DOM | 53/53 a 1440, 768, 390 y 320 px; 212 comparaciones |
| Fechas, slugs, H1 y canonical | 53/53 |
| Build de producción | Correcto; 142 páginas generadas |
| TypeScript | `npx --no-install tsc --noEmit`, sin errores |
| ESLint | `npm run lint`, sin errores ni advertencias |
| Pruebas existentes y actualizadas | 27 superadas, 0 fallos |
| Encabezados y fragmentos de índice | 163 destinos únicos; jerarquía correcta |
| Redirecciones existentes | 163 solicitudes con 308 directo al destino esperado |
| Controles de rutas inválidas | 8 respuestas 404 esperadas |
| Imágenes locales | 53 recursos con HTTP 200, dimensiones y alt comprobados |
| Enlaces internos | 56 destinos con respuesta satisfactoria |
| Sitemap | 53 URLs canónicas, una entrada por artículo |
| Responsive | 53 artículos y 11 listados a cada ancho; 256 vistas sin desbordamiento de página |
| Accesibilidad automática | 40 muestras axe WCAG A/AA sin infracciones detectadas |
| Conversaciones sin JavaScript | Ambas visibles; 2 y 3 intercambios respectivamente |
| Tablas en móvil | Dos tablas, 6 filas por tabla; desplazamiento horizontal y foco operativos |
| Errores de navegador | Ninguno |

Se inspeccionaron capturas de la entrevista y la conversación en escritorio y móvil, además de las tablas en tablet y móvil. Las pruebas automatizadas de accesibilidad son un control técnico acotado, no una certificación universal.

Resultados completos: [closing-validation.json](blog-2027/closing-validation.json). Inventario técnico de los 53 artículos: [closing-inventory.json](blog-2027/closing-inventory.json).

## Alcance de archivos y Git

La implementación afecta a los datos del blog, su componente de artículo y conversaciones, el tratamiento seguro de enlaces de texto vacío, pruebas y documentación de restauración. No se cambian Home, Hero, Uniformes, fotografías, formularios, páginas legales ni configuración de redirecciones. El Word se incorpora como fuente documental para reproducir las comprobaciones. No hay cambios de dependencias, arquitectura, DNS ni configuración de Vercel.

Se comprueba `git diff --check` antes del commit. La operación autorizada es un único commit de restauración y push exclusivamente a `origin/redesign-2027-home`; la confirmación remota del SHA y de los checks se entrega al finalizar. No se abre PR, no se hace merge y no se despliega manualmente.

## Preview y límites remotos

Preview de rama proporcionado por el propietario: [Blog en Vercel Preview](https://cotton-country-git-redesign-2027-home-manuels-projects-8b611ec0.vercel.app/blog).

El intento desde este entorno devuelve **403 durante CONNECT** del proxy de salida (`server: envoy`). No se obtiene una respuesta de la aplicación Vercel y no se ha realizado una comprobación visual remota. Las verificaciones de navegador descritas arriba son locales sobre el build de producción. No hay un conector autorizado de Vercel disponible para consultar deployments; el resultado consultable en GitHub tras el push se entrega por separado. No se inventa una URL inmutable ni se atribuye este bloqueo a un fallo del sitio.

No se certifica publicación en producción ni indexación efectiva en Google. No se modifica producción.
