# Cotton Country 2027 — Navegación y testimonios

Corrección acotada sobre `redesign-2027-home`, desde `bf19ef45d655f1cb832dbc5cafe36387d6ea072f`.

## Uniformes y Prendas

Uniformes es ahora un enlace directo a `/uniformes` tanto en escritorio como en móvil. Se retiran el desplegable, la flecha, los submenús y sus estilos. SizeSet, Blog, Contacto y Contáctanos mantienen sus destinos; la navegación sigue centrada respecto a la pantalla y el botón permanece a la derecha.

La página `/uniformes` conserva su contenido. Educación privada, Salud privada, Retail, Agroindustria, Seguridad privada y HORECA corresponden a la fase siguiente y no se crean aquí.

Las cuatro familias de la Home conservan sus destinos independientes:

- Camisas: `/uniformes/camisas`.
- Blusas: `/uniformes/blusas`.
- Polos: `/uniformes/polos`.
- Pantalones: `/uniformes/pantalones`.

## Avance automático accesible

- Intervalo de siete segundos, con un único `setTimeout` y limpieza al cambiar de estado o desmontar el componente.
- El temporizador solo está activo cuando al menos el 25 % del carrusel está visible, la pestaña está activa y no se solicita movimiento reducido.
- Entrar con el cursor pausa inmediatamente. Salir reinicia un plazo completo de siete segundos para permitir la lectura.
- El foco, los controles, las pestañas de cliente, el teclado y el tacto pausan de forma persistente. La salida del cursor no cancela una pausa manual.
- El nuevo control Pausar/Reanudar permite continuar expresamente. La intención del clic se conserva antes de que el foco pause el carrusel, evitando invertir accidentalmente la acción solicitada.
- Los gestos horizontales conservan la navegación; el desplazamiento vertical de la página sigue disponible.
- Con `prefers-reduced-motion`, no hay avance automático y el control lo indica; la navegación manual continúa disponible.
- Las actualizaciones del contador no se anuncian automáticamente cada siete segundos a lectores de pantalla. La región mantiene paneles identificados, `aria-hidden`, `inert` y las teclas Flecha izquierda/derecha, Home y End.
- Estado inicial igual en servidor y cliente, sin leer preferencias del navegador durante el render de servidor. Suscripciones y temporizador se limpian en sus efectos.

## Tipografía y composición

Se mantienen la fuente editorial, la paleta, las citas y las atribuciones originales. Se reduce la cita de hasta 38 px a 23–29 px en escritorio y de 27 a 23 px en móvil, con interlineado 1.55 y ancho máximo de 960 px. Se compactan espacios de título, cita, identificación, selector y controles; la identificación del cliente pasa a 17 px en escritorio.

Se conserva el ajuste de altura con `ResizeObserver` y sus transiciones, para mostrar las citas completas de distintas extensiones. Los controles móviles se distribuyen en dos filas estables para incorporar Pausar/Reanudar sin desbordamientos.

## Verificación

- Build correcto: 126 páginas generadas.
- TypeScript sin errores.
- Lint sin errores; cinco advertencias preexistentes de `<img>` en la página de proveedor.
- Chromium: avance automático medido con intervalos reales de siete segundos, pausa de cursor, reanudación, pausa manual persistente y lectura por teclado. Preferencia de movimiento reducido, pausa fuera de pantalla y limpieza al navegar a `/uniformes` mediante Next Link.
- Instrumentación de temporizadores en las pruebas: máximo de un temporizador de rotación simultáneo; cero durante las pausas y tras la navegación.
- Móvil a 390 px: entrada táctil nativa de Chromium, pausa al tocar, desplazamiento horizontal y reanudación mediante toque en el control.
- Anchos 320, 390, 768, 1024, 1366 y 1440: navegación directa, centrado de escritorio, citas completas, altura adaptable y ausencia de textos cortados, elementos fuera del viewport o desbordamiento horizontal.
- Los cuatro destinos reales de Prendas responden HTTP 200. Se comprueba la navegación móvil a `/uniformes` y el cierre del menú.
- Datos de los tres testimonios comparados literalmente con el commit base; no se añaden citas ni atribuciones.
- Comparación de reglas CSS con PostCSS: todos los estilos fuera del carrusel y los estilos de desplegable retirados permanecen idénticos. Un margen móvil de Prendas afectado durante la edición se restauró antes de la compilación y capturas finales.
- Sin errores de hidratación o ejecución observados en las pruebas.

## Alcance y archivos

- `components/Header.tsx`: enlace directo y retirada del submenú.
- `components/Testimonials.tsx`: política de avance automático y su control accesible.
- `components/chrome.module.css`: retirada de estilos del desplegable.
- `components/home.module.css`: únicamente tipografía y composición de testimonios y controles.
- `docs/navigation-testimonials-review.md`: este informe.

No se modifican Hero, filosofía, iconos, Prendas, formulario, footer, recursos fotográficos, dependencias, rutas, SEO, analítica ni integraciones. Se conserva el código del evento `email_click`.

Capturas completas y recortes de testimonios de escritorio/móvil: `/tmp/cotton-navigation-carousel`. Los scripts `autoplay.cjs`, `layout.cjs` y `capture.cjs` documentan las comprobaciones locales de esta sesión.

Las pruebas táctiles usan emulación de Chromium, no un dispositivo físico. No se realizan envíos de formulario ni pruebas de servicios externos, que permanecen fuera del alcance de esta corrección.

Publicación autorizada mediante un único commit final y un único push a la rama de Preview. Sin merge a `main`, despliegues manuales ni cambios en producción o Vercel.
