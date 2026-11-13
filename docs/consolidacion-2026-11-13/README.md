# Consolidación — 13 de noviembre de 2026

Repositorio `MTinocoZevallos/cotton-country-web`, rama exclusiva `redesign-2027-home`. Base: `e3f59e0e608597acaa65685917721e1dfae7467f`. La instrucción integral y la corrección de la denominación Guardapolvo sustituyen las instrucciones editoriales anteriores. Este hito es una implementación parcial verificable: los insumos que faltan impiden declarar cumplidos todos los criterios de aceptación.

## Implementación y conservación editorial

- Los **53 artículos** siguen publicados con sus slugs históricos y canónicas raíz. [Inventario JSON](inventario-editorial.json) y [CSV](inventario-53.csv): título, slug, publicación original, actualización, estado editorial, imagen y canonical. Una fecha nula significa desconocida; no una fecha estimada.
- Se recuperaron 17 registros anteriores a las reescrituras desde `c81d52c2f73612cf08554692e47cc3ed4a85db67`: diez pendientes y siete cuyos textos finales aprobados no están disponibles. Los otros 35 se conservan. Los **52 registros completos**, incluido chef y sus imágenes históricas, coinciden con su versión original mediante hashes; los 35 fuera de revisión mantienen además su fuente sin cambios respecto a la base. Las entrevistas y opiniones originales no se sustituyen. Las dos tablas de la entrevista de IA recuperan representación semántica conservando cada valor.
- **Ninguna de las siete versiones finales se declara incorporada.** Faltan: ¿Qué significa tallas completas en ropa?, Una IA nos da tablas de medida para el mercado peruano, NTP para la designación de tallas, La talla peruana, Las tallas completas según una IA, El problema de las tallas y Una breve historia del algodón. [Slugs exactos](aprobados-faltantes.json).
- Guardapolvo es la única actualización editorial actual (`updatedAt: 2026-11-13`). Título: «El guardapolvo: usos, telas y aplicaciones». URL conservada: `/el-uniforme-de-farmacia`. Incluye aplicaciones, alternativas textiles sin atribución al modelo y el cierre comercial indicado, sin promesas sanitarias ni certificaciones.

## Datos indispensables pendientes

**Fotografía:** la imagen incrustada en el chat es visible, pero su archivo original no está disponible en adjuntos descargables, descargas compartidas ni archivos de trabajo. No hay identificador Sediment de esa imagen que permita descargarla. Se necesita adjuntar el PNG o ZIP original. No se ha generado, sustituido ni tomado otra imagen. La portada antigua de farmacia se conserva como archivo histórico y se excluye de la presentación, Open Graph y BlogPosting del Guardapolvo. No se publica una imagen provisional. **El modelo de Prendas y su enlace desde el cierre siguen pendientes**; no se crea un modelo con imagen inexistente ni un enlace roto. Los 45 modelos existentes y sus archivos permanecen intactos. Todavía no existe `guardapolvo-cotton-country.webp`.

**Fechas:** ninguno de los 53 registros contiene fecha original verificable. El historial `c77676c9d8fe2b6da703e4606449606211b6b2c7` evidencia el archivo importado en orden inverso de inserción. Se recupera esa secuencia, se elimina el orden alfabético y se usa la misma función en portada, categorías, paginación y publicaciones del archivo. La función ordena descendentemente por publicación original cuando exista; nunca por actualización. Interpreta fechas de calendario sin cambio de día por UTC, timestamps con zona y rechaza fechas inválidas. **No puede certificarse la cronología real hasta recibir las fechas originales**, por ejemplo mediante exportación WordPress. No se usan fechas de Git como publicación.

**Interés:** se registra exclusivamente el dato suministrado: 589 clics de Search Console para «¿Qué significa tallas completas en ropa?». Las recomendaciones se identifican como selección editorial; no hay ranking automático ni equivalencia entre clics y lecturas. Falta el reporte completo y su periodo. El dato queda separado de la presentación para incorporar fuentes futuras sin desarrollar una integración nueva.

## Comercial, navegación y SEO

- Seis segmentos públicos: Educación privada, Salud privada, Retail, Agroindustria, Seguridad privada y HORECA. Se reutiliza la plantilla sectorial y el sitemap los incorpora desde su registro. Los cuatro casos publicados permanecen iguales; Molino Contreras y Premex siguen en borrador. No se inventan casos para completar sectores.
- Footer expresa fabricación bajo pedido según especificaciones. Correo y teléfono son enlaces utilizables. Home, Hero, navegación principal, fotografías, familias existentes, legales y SizeSet no cambian. No se amplían funcionalidades de SizeSet.
- Se conserva el dominio canónico `https://cottoncountry.com.pe`, verificación Google y robots. Los 159 alias existentes conservan redirecciones permanentes **308 directas**, ya verificadas; no se crean cambios cosméticos ni cadenas. No fue necesario añadir redirecciones 301. Se revisaron metadatos, encabezados, canonical, Open Graph, BlogPosting, BreadcrumbList y sitemap. Se añade Organization global con nombre comercial y datos de contacto ya publicados, sin afirmar una razón social nueva.

## Validaciones ejecutadas

- Build de producción: satisfactorio, 146 páginas prerenderizadas. TypeScript, lint y `git diff --check`: sin errores.
- `node --test tests/*.test.mjs`: **16 pruebas correctas**, incluidas preservación de 52 originales, fechas, tablas, seguridad del contenido, catálogo y formularios.
- [Auditoría HTTP](auditoria-local.json): 53 artículos accesibles y descubribles, 11 listados/paginaciones, 159 alias directos, 70 destinos internos, 132 fragmentos, 104 recursos de imagen y ocho controles negativos; **cero fallos**. Solo ámbito local; no acredita un inventario completo de URLs de WordPress ni el estado del dominio remoto.
- [Chromium](responsive-local.json): 44 muestras en once rutas a 1440, 768, 390 y 320 px; sin desbordamiento ni errores de JavaScript. Menú móvil, seis sectores, artículo Guardapolvo y dos tablas comprobados. Dieciséis análisis axe del contenido principal sin infracciones detectadas tras corregir el foco de las tablas desplazables. No equivale a una auditoría manual exhaustiva de accesibilidad.
- [Lighthouse móvil](rendimiento-local.json), dos muestras locales: Blog **92**, LCP 3,41 s, TBT 55 ms; artículo de tallas **97**, LCP 2,57 s, TBT 34 ms; CLS **0** en ambas. Muestras anteriores de la base: rendimiento 92/94, LCP 3,30/3,04 s, CLS 0. Comparación orientativa de laboratorio con contenido distinto; no demuestra CWV de campo ni INP. GTM externo bloqueado en este entorno afecta a la comprobación de servicios externos.

## Formularios, medición y límites externos

Se conserva una sola instalación de `GTM-K9LCWTCT`, sin añadir etiquetas GA4/Ads ni modificar campañas. Chromium verifica exactamente un `email_click` y un `phone_click` por clic de Footer. Header mantiene su evento existente. El formulario conserva `formulario_enviado` únicamente tras respuesta satisfactoria. Las pruebas de API utilizan transportes simulados y comprueban contexto comercial, campos, correo corporativo y Turnstile; no se envían correos reales. Sin acceso al contenedor GTM, GA4 o Ads **no se certifica la recepción ni configuración de conversiones**. No se solicitaron credenciales.

Vercel y el origen remoto responden 403 desde el proxy del entorno; esto no demuestra un fallo del sitio. La entrega debe consultar GitHub Checks del commit nuevo y distinguir el check de comentarios de Vercel de un despliegue listo. No se realiza despliegue manual, PR, merge ni publicación a producción.

## Comprobaciones posteriores en Search Console

1. Inspeccionar las canónicas históricas y `/el-uniforme-de-farmacia`; confirmar indexación y ausencia de duplicados por alias.
2. Comprobar lectura de sitemap, redirecciones y errores de cobertura con URLs reales del reporte.
3. Revisar mejoras de datos estructurados, experiencia móvil y CWV de campo cuando haya datos suficientes.
4. Contrastar clics por artículo y periodo; confirmar eventos en GTM Preview/GA4 DebugView y conversiones Ads sin modificar campañas.
5. Completar los siete textos, fechas y foto original antes de aprobar el cierre integral. No se declara recuperado el posicionamiento ni terminada la integración del Guardapolvo.
