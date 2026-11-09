# Cotton Country 2027 — Home editorial minimalista B2B

Implementación integral sobre `redesign-2027-home`, partiendo de `08cff228f2b693b68efe19c313735f1fccec1d43`. Se toma como base la propuesta A y se aplican las decisiones posteriores: Hero B — Luz natural, iconos lineales en filosofía y Prendas — Editorial ordenada.

## Resultado por sección

1. **Header:** logotipo original a la izquierda, navegación centrada respecto al viewport mediante columnas laterales iguales y Contáctanos a la derecha. Uniformes y su desplegable, SizeSet, Blog y Contacto conservan destinos y comportamiento. En móvil, menú compacto y botón de contacto visible. No se modifica `Header.tsx` ni `email_click`.
2. **Hero:** se incorpora el recurso fotográfico limpio y retocado de B, con aeropuerto visible y sombra carbón progresiva. Es el recurso aprobado del ejercicio anterior, sin textos superpuestos, no una fotografía nueva ni una captura de maqueta. El WebP tiene 1672 × 941 px y 146216 bytes (aproximadamente 143 KiB). Se sirve directamente con `next/image` y `unoptimized` porque ya está optimizado; esto evita una segunda compresión y permite reutilizar la misma URL como continuidad de fondo móvil. DM Serif Display, titular, argumento, CTA a `/uniformes` y lógica/tiempos del tipeado permanecen. Hero compacto de unos 691 px a 1366 × 768, con todos los textos y CTA visibles.
3. **Cada detalle cuenta.:** nuevo titular aprobado, con el punto final solicitado. Se conserva íntegro el párrafo técnico y las descripciones originales. Los copos se sustituyen por MessagesSquare, ClipboardList y BadgeCheck de Lucide, ya incluido en el proyecto; todos de 36 px, trazo 1.5 y azul corporativo. Composición de dos columnas con pilares en filas abiertas; lectura vertical en móvil. Entrada suave al aparecer.
4. **Prendas:** cuatro columnas iguales en escritorio, dos en tablet y una en móvil estrecho. Todas las fotografías conservan sus archivos y encuadre superior, con marcos verticales 3:4 y radio de 24 px/20 px. Los enlaces inferiores son discretos y se alinean por fila incluso cuando una descripción ocupa dos líneas. Se elimina el botón circular fluorescente superpuesto y la asimetría. Se mantienen las cuatro familias, descripciones, rutas y texto de cierre.
5. **Nuestros clientes opinan:** cita editorial protagonista, identificación y logo del cliente debajo, pestañas y controles discretos sobre marfil. Se conservan literalmente las tres citas completas. Pista horizontal real, teclado, gestos táctiles e inactividad accesible de paneles ocultos. `ResizeObserver` ajusta suavemente el alto a cada cita y al ancho disponible, evitando recortes y el espacio sobrante de fijar la altura de la cita más larga.
6. **Contacto:** superficie blanca, composición editorial en dos columnas, cinco campos proporcionados, etiquetas legibles y CTA de píldora de tamaño moderado con texto centrado. `ContactForm.tsx` no se modifica: quedan intactos Resend, Turnstile, validaciones, estados y `formulario_enviado`.
7. **Footer:** superficie blanca y logotipo original azul, siguiendo A. Información, direcciones, teléfono, correo, mapa, redes y legales íntegros. Solo cambia el recurso de logo y sus dimensiones en el componente; el resto del contenido y enlaces es idéntico al original.

## Sistema visual y experiencia

Se conservan los seis tokens de marca: blanco, marfil, carbón, azul corporativo, azul profundo y amarillo fluorescente. Predominan superficies claras; el amarillo se concentra en acciones. No se cambian los tokens globales.

DM Serif Display se comparte entre Hero, títulos y citas mediante `components/home-font.ts`, aplicado al contenedor de la Home. Inter continúa en textos e interfaz; la identificación de clientes utiliza Manrope. La tipografía del contenido de otras páginas no se cambia.

Se conservan las mejoras progresivas del Hero y de las entradas. Se retira el desplazamiento independiente de prendas para mantener alineada la cuadrícula; las fotografías tienen hover moderado. El observador de revelados deja de necesitar listeners de scroll y cálculos de parallax. Con movimiento reducido, se muestra todo sin animación; el titular tiene alternativa sin JavaScript.

Cabecera y footer son componentes compartidos: sus nuevos estilos se presentan también en las páginas que ya los utilizan. No se modifican sus contenidos específicos, rutas ni metadatos.

## Archivos de esta intervención

- `components/Hero.tsx`: recurso natural aprobado y fuente editorial compartida; animación y textos conservados.
- `components/home-font.ts`: fuente local compartida y limitada a la Home.
- `components/HomeExperience.tsx`: fuente del contenedor y observador ligero de entradas, sin parallax de prendas.
- `components/ThreeReasons.tsx`: titular definitivo, filas técnicas e iconos lineales.
- `components/Basics.tsx`: prendas iguales, enlaces inferiores y eliminación del botón superpuesto.
- `components/Testimonials.tsx`: cita protagonista y ajuste de altura accesible del carrusel.
- `components/Footer.tsx`: logo original azul con proporción correcta para fondo claro.
- `components/home.module.css`: sistema editorial, Hero natural, cuadrícula ordenada, citas, contacto y responsive.
- `components/chrome.module.css`: navegación centrada y footer claro.
- `public/hero-airport-natural.webp`: imagen aprobada optimizada.
- `docs/home-2027-review.md`: esta revisión.

Sin cambios en dependencias, lockfile, API, lógica del formulario, eventos, GTM, rutas, SEO/metadatos, Blog, páginas sectoriales, proyecto SizeSet o infraestructura/Vercel.

## Verificaciones

- `npm run build`: correcto, 126 páginas generadas.
- `./node_modules/.bin/tsc --noEmit`: correcto.
- `npm run lint`: cero errores; cinco advertencias preexistentes sobre `<img>` en la página de proveedor, líneas 74, 155, 173, 191 y 209.
- Comparación literal con el commit base: lógica de tipeado, componente Header, componente ContactForm, datos de familias y testimonios, párrafo técnico y contenido/enlaces del Footer conservados. Única sustitución comercial: el titular aprobado de filosofía.
- Chromium real con Playwright: escritura por prefijos reales, dos líneas, fuentes editoriales, CTA y argumento exactos, navegación centrada y botón Contáctanos. Se verifica que el titular no cambia de alto durante la escritura.
- Home completa a 1440 × 900 y 1366 × 768, además de móvil a 390 px; capturas completas revisadas. Comprobaciones adicionales a 320, 575, 768, 900 y 1024 px: sin overflow horizontal, texto recortado o bloques fuera del viewport.
- Prendas: cuatro tamaños idénticos, cuatro columnas alineadas en escritorio, formato vertical, radios consistentes y destinos correctos.
- Iconos: correspondencia de los tres símbolos, tamaño/trazo/color homogéneos y ausencia de copos/isotipos en la sección.
- Carrusel: todas las citas comparadas con el original; controles, flechas/Home/End, paneles accesibles y altura completa de la cita más larga comprobados también en móvil. Gesto táctil nativo de Chromium a 390 px: avance, retroceso y scroll vertical conservado.
- Formulario: cinco campos obligatorios, validación de seguridad original y CTA centrado. Prueba local sin captcha muestra el mensaje previsto sin llamar a `/api/contact`. `email_click` comprobado interceptando la navegación de correo.
- Once destinos internos responden HTTP 200. Seis páginas que comparten header/footer revisadas en móvil, sin desbordamientos. Sin errores JavaScript en estas pruebas.
- Movimiento reducido: cero animaciones activas, contenido completo y sin reiniciar el tipeado al alternar preferencias. Alternativa del titular sin JavaScript comprobada.

## Capturas de la sesión

- `/tmp/cotton-approved-home/home-1440.png`: Home completa, viewport 1440 × 900.
- `/tmp/cotton-approved-home/home-1366.png`: Home completa, viewport 1366 × 768.
- `/tmp/cotton-approved-home/home-390.png`: Home completa móvil.
- `hero-1440.png`, `hero-1366.png`, `hero-390.png`: detalles de Hero.
- `testimonio-1-1366.png`, `testimonio-2-1366.png`, `testimonio-3-1366.png` y `testimonio-2-390.png`: comprobaciones de citas.
- `formulario-validacion-390.png`: estado local de validación sin envío.
- Scripts y registro de navegador en el mismo directorio temporal.

## Límites y publicación

La fotografía corresponde al retoque tonal generativo B previamente seleccionado; no se presenta como recuperación exacta de una fotografía original sin tratamiento. Se usa el recurso fotográfico limpio, no una maqueta con textos.

No se ejecutaron envíos reales con Resend ni una validación real de Turnstile. Las pruebas locales bloquearon recursos externos de captcha, mapa y analítica; preservan su código pero no certifican sus respuestas remotas. Tampoco equivalen a Core Web Vitals de tráfico real o una revisión en dispositivos físicos.

Se publica únicamente un commit final y un push a `redesign-2027-home`, conforme a la autorización del usuario. No hay merge a `main`, despliegue manual ni cambios de dominio, plan o configuración de Vercel. El Preview corresponde al despliegue automático de la integración Git.
