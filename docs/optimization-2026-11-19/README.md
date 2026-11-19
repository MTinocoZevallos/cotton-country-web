# Home móvil, rendimiento y tarjetas sociales — 19/11/2026

Base aprobada: `9645d6b4bd5be18fb66641a2c6544b415bd3626b`. Rama de revisión: `improve-mobile-performance-social`. Esta entrega se limita a Preview; no autoriza ni ejecuta publicación en Production.

## Cambios

- Hero móvil (<768 px): fotografía original conservada, encuadre `80% 0%`, marco de 480 px y máscara progresiva hacia el fondo blanco. Título azul, texto carbón y CTA sobre blanco. Desaparece la segunda fotografía extendida detrás del contenido y el corte inferior. La animación de escritura sigue funcionando. En móvil, la aparición de texto/CTA mantiene su secuencia y desplazamiento, sin una fase de opacidad que reduzca el contraste. Funcionan también sin JavaScript y con movimiento reducido.
- Escritorio/laptop: se mantiene la composición de dos capas fotográficas, degradado oscuro, dimensiones, tipografía, textos, CTA y animaciones. El fondo CSS se reemplaza por una imagen decorativa optimizada con el mismo `cover` y centrado. Las dos capas solicitan exactamente la misma variante y el navegador reutiliza una única descarga. La imagen decorativa no duplica el texto alternativo.
- Carga: Next Image deja de estar `unoptimized`, usa WebP con calidad 85, tamaños responsive, preload y `fetchPriority="high"`. La configuración de imágenes admite 75 (valor existente para otras imágenes) y 85. El original de 1670 × 942 y 187.794 bytes permanece idéntico, sin recorte, retoque ni ampliación. Una variante completa WebP pesa 93.260 bytes; el tamaño servido varía con viewport/DPR. No se cambiaron las reglas de redirección.
- JavaScript: el contexto comercial del formulario y sus datos de catálogo/casos se importan al preparar un envío, dentro del manejo de errores existente. El formulario conserva los campos, validación, Turnstile, API, destinatarios y conversión tras éxito confirmado. En Home se evita precargar automáticamente las páginas de navegación y el destino del CTA durante la carga inicial; los enlaces conservan su navegación cliente.
- Fuente editorial: WOFF2 de 31.756 bytes derivado sin pérdidas del TTF original de 76.580 bytes. Se verificaron idénticos cmap, glifos, contornos y métricas horizontales. Se conserva el original y la licencia; `next/font/local` mantiene `swap` y su configuración tipográfica.
- Open Graph: tarjeta de marca aprobada por el propietario durante esta intervención, PNG de 1200 × 630, logotipo original blanco, azul `#01018B` y «Uniformes que visten tu marca». Home, Nosotros y Uniformes tienen imagen, Twitter Card y metadatos específicos; los 53 artículos conservan sus títulos e imágenes propias. Los artículos sin imagen visible usan la tarjeta de marca como alternativa social, sin insertar una fotografía nueva en el artículo. Los canonical, contenido editorial y fechas no cambian.
- Las imágenes sociales usan URLs absolutas: el host del deployment cuando `VERCEL_ENV=preview` y existe `VERCEL_URL`, y `cottoncountry.com.pe` en Production. Así Preview no depende de un archivo nuevo todavía inexistente en Production. No se modifican variables de entorno: se leen las variables de sistema de Vercel. El script `node scripts/generate-social-image.mjs` reproduce la tarjeta a partir del logotipo y la fuente locales.

## Diagnóstico y comparación de rendimiento

El resultado público proporcionado por el propietario es PageSpeed móvil de 19/11/2026: rendimiento 57, accesibilidad/buenas prácticas/SEO 100, FCP 1,9 s, LCP 9,1 s, TBT 610 ms, CLS 0 y Speed Index 3,7 s. No se accedió a su traza ni se repitió PageSpeed público; esos datos no son una medición ejecutada aquí.

Las mediciones propias usan Lighthouse 12.8.2, Chromium, compilación de producción local, perfil móvil y throttling simulado predeterminado (configuración completa en `performance-local.json`). Se hicieron tres perfiles de Chrome nuevos antes y después; la caché del optimizador de imágenes del servidor estaba caliente. GTM y Turnstile se bloquearon de forma idéntica durante ambas series para no ejecutar etiquetas reales ni solicitudes de CAPTCHA. Ese bloqueo solo existe en las herramientas de prueba: los scripts del sitio no se eliminaron ni reconfiguraron. No se enviaron correos ni conversiones externas.

| Métrica | Antes local (mediana) | Después local (mediana) |
| --- | ---: | ---: |
| Rendimiento | 92/100 | 92/100 |
| Accesibilidad | 100/100 | 100/100 |
| Buenas prácticas | 100/100 | 100/100 |
| SEO | 100/100 | 100/100 |
| FCP | 1,387 s | 1,386 s |
| LCP | 3,311 s | 3,317 s |
| TBT | 70,5 ms | 46,5 ms |
| CLS | 0 | 0 |
| Speed Index | 1,508 s | 1,389 s |
| Recurso Hero | 187.794 bytes | 93.260 bytes |
| JavaScript transferido | 177.950 bytes | 151.074 bytes |

Las puntuaciones individuales de rendimiento fueron 90/92/92 antes y 91/94/92 después. No se selecciona el mejor resultado para representar la entrega. La reducción comprobada de TBT es del 34 %, de fotografía del 50 % y de JavaScript del 15 %. El LCP local no presenta una mejora significativa: queda prácticamente igual y aún supera 2,5 s. Estas pruebas no demuestran que el 9,1 s público se haya corregido ni que Production vaya a obtener 90 puntos.

Evidencia de causas locales: antes, el elemento LCP era el fondo CSS del Hero, con solicitud de prioridad baja; en una muestra, el retraso de renderizado representaba aproximadamente el 74 % del LCP simulado. Después es la imagen HTML con prioridad alta, descubrimiento en el documento y una única solicitud. El contexto del formulario importaba datos extensos antes de cualquier envío; se separó esa carga. La precarga de otras rutas competía con recursos iniciales. La escritura animada, hidratación, fuentes y composición siguen aportando trabajo; no se eliminan funciones para esconder su coste.

No se puede atribuir el TBT público de 610 ms específicamente a GTM, Ads o Turnstile con esta evidencia. Falta una traza pública con terceros y el resultado del nuevo deployment para aislar esos costes. Tampoco se midió INP ni se certificaron Core Web Vitals de campo; TBT es una métrica de laboratorio. La latencia real, CDN, estado de caché y carga del dispositivo pueden cambiar los resultados.

## Verificación

- `npm run build`: satisfactorio, 143 páginas generadas.
- `npx --no-install tsc --noEmit`: satisfactorio.
- `npm run lint`: satisfactorio.
- `node --test tests/*.test.mjs`: 37 pruebas satisfactorias. Incluye envíos simulados aceptados/error/excepción, conversión solo tras confirmación, tarjetas sociales y separación de hosts Preview/Production.
- `git diff --check`: satisfactorio.
- Chromium: 1440, 1280, 1024, 768, 390 y 320 px; sin desbordamientos, foto decodificada, una sola descarga del Hero, menú y enlaces funcionales. Título, párrafos y CTA conservan sus coordenadas y dimensiones de la base en 1440, 1280 y 768 px. En móvil, el CTA queda por debajo del marco de la fotografía.
- Carrusel: ocho prendas, dos indicadores y enlaces de destino 200. Ningún cambio en sus modelos ni lógica.
- Accesibilidad: axe WCAG A/AA sin infracciones a 1440, 768, 390 y 320 px; texto y CTA visibles también sin JavaScript y con movimiento reducido.
- SEO HTTP local: Nosotros 200; 53 artículos 200; 163 variantes históricas y ocho variantes comerciales redirigen directamente como antes; `/nosotros/` normaliza a `/nosotros`, nunca a Home. Canonical correctos, sitemap con cada artículo y Nosotros una vez, robots accesible.
- HTML de Home, Nosotros, Uniformes y los 53 artículos: una imagen OG, una Twitter Card grande, título/descripción/URL/tipo específicos y archivos de imagen con HTTP 200 local. Pruebas verifican dimensiones reales y URLs absolutas. No se ha probado la caché de WhatsApp, LinkedIn o Facebook desde sus servicios reales.
- Formulario en navegador: la guarda de Turnstile impide enviar sin token y no registra conversión; los casos de envío positivo/error se ejecutan con simulaciones automatizadas.
- Comparación con la base: originales de fotografía, 53 artículos, datos de prendas/casos, API, layout/GTM/Search Console, sitemap y robots intactos. El único cambio en `next.config.ts` es la lista de calidades de imágenes. No se modifica código de Turnstile, Resend, variables, DNS ni Vercel.

Capturas de revisión: `hero-mobile-390.png`, `hero-desktop-1440.png`; tarjeta aprobada: `public/social/cotton-country.png`. `browser-verification.json` conserva el resumen del recorrido HTTP y responsive; `performance-local.json`, las seis mediciones y sus condiciones.

## Pendiente remoto

El despliegue automático de esta nueva rama debe verificarse por su commit en Vercel Preview antes de solicitar autorización de merge. Si el proxy bloquea el acceso, el informe de entrega lo indicará y enlazará los checks de GitHub, sin afirmar estado Ready ni revisión visual remota. Production debe conservar `9645d6b` hasta aprobación expresa.

Tras la revisión, ejecutar PageSpeed móvil con GTM/Turnstile reales y revisar el desglose LCP/TBT. La imagen social nueva solo estará disponible en el dominio de producción después de una futura publicación autorizada; ahora se sirve en el deployment de Preview.
