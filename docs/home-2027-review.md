# Cotton Country 2027 · Corrección integral de la Home

Revisión implementada sobre `redesign-2027-home`, conservando la arquitectura de cinco secciones y footer. Sin merge, push ni despliegue. `main` y producción permanecen intactos. La composición inspirada en el isotipo y la distribución de prendas se presentan para evaluación visual, no como decisiones aprobadas por el resultado de la compilación.

## Identidad definitiva

Los seis colores siguen centralizados en `app/design-tokens.css`: azul `#01018B`, azul profundo `#04045E`, marfil `#F6F5F2`, **lima definitivo `#ABDF00`**, carbón `#393535` y blanco `#FFFFFF`. El valor anterior del lima se eliminó de la implementación visual. Las transparencias y tonos secundarios derivan de esta paleta.

Se conservan las fuentes locales Manrope para H1 800, H2 700 y H3 600, e Inter para contenido y controles. El titular del hero es completamente blanco; el lima se reserva principalmente para CTA, foco e interacciones. Se añadió el token de radio de control de 14 px.

## Seis bloques corregidos

### 1. Hero

- Se conserva `/hero-bg.webp`. El contenedor de fotografía empieza debajo del encabezado de 80 px, con ajuste superior y encuadres horizontal/móvil específicos. Se retiró el desplazamiento de la foto para conservar el encuadre de la cabeza. El degradado aprobado se mantiene.
- Titular visible en exactamente dos líneas: “¿De qué viste” y “tu marca?”. La segunda utiliza un tamaño 30 % mayor. Ambas son blancas.
- Subtítulo definitivo: **Te invitamos a descubrir el poder del uniforme.**
- CTA **Descubre nuestros uniformes** a `/uniformes`, con lima definitivo y texto carbón.
- Escritura real mediante incorporación progresiva de caracteres al DOM. Dos líneas invisibles completas reservan el espacio desde el primer frame; el H1 proporciona un nombre accesible completo para no hacer leer cada letra a lectores de pantalla.
- Secuencia aproximada después de disponer de las fuentes: primera línea desde 220 ms, segunda desde 1350 ms, subtítulo a 2150 ms y CTA a 2650 ms. Final a 3350 ms. Los temporizadores se limpian al salir de la página; no se repite al hacer scroll ni al alternar la preferencia de movimiento.
- Con movimiento reducido el contenido es inmediato y estático; sin JavaScript hay una alternativa completa mediante `noscript`. El CTA se muestra también al recibir foco por teclado durante la entrada.
- Retirados la etiqueta superior, la numeración “Cotton Country / 01” y los elementos decorativos solicitados.

El encabezado conserva el logo y `email_click`, e incorpora acceso a Uniformes y sus cinco familias existentes, la página de soluciones corporativas, Blog y el formulario de la Home. El menú móvil se abre/cierra mediante un botón con estado accesible, admite Escape y devuelve el foco al control. Todos los enlaces incorporados corresponden a rutas verificadas; no se crearon páginas.

### 2. Los detalles

Se conservan literalmente:

> Los detalles NO son un detalle en la confección.

> Cada proyecto empieza por entender lo que tu empresa necesita. A partir de ese requerimiento, definimos las especificaciones: tejidos, acabados y funcionalidad de cada prenda. La calidad de confección y el cuidado en la ejecución orientan el trabajo para cumplir lo acordado.

- **Asesoría:** comprender las necesidades y especificaciones del cliente.
- **Método:** convertir esos requerimientos en decisiones técnicas y procesos de confección.
- **Cumplimiento:** ejecutar y entregar conforme a los compromisos establecidos.

Se eliminaron el triángulo, todas sus líneas y vértices, la etiqueta decorativa y sus numeraciones. La composición emplea superficies redondeadas y el **isotipo original**, localizado en `public/logo-cotton-country.png`: se muestra la zona del símbolo mediante un viewport SVG, referenciando la imagen original de 3004 × 1268. No se redibujó, recoloreó ni deformó el isotipo; tampoco se modificó el archivo original.

Asesoría entra desde la izquierda y Método desde la derecha. Cuando ambas están asentadas, Cumplimiento cae desde arriba con desaceleración y un asentamiento de pocos píxeles. Cumplimiento usa azul corporativo. El titular utiliza el revelado suave existente, distinto del tipeado. En móvil estrecho los pilares se ordenan verticalmente para mantener sus descripciones legibles.

Las superficies que acompañan el símbolo son contenedores de contenido, no una nueva versión del isotipo. Su relación gráfica y la percepción del movimiento quedan pendientes de aprobación visual.

### 3. Nuestras prendas

Se conservan exactamente las cuatro imágenes y enlaces anteriores: Camisas, Blusas, Polos y Pantalones. No se sustituyó ningún archivo fotográfico. Los contenedores ahora son verticales 3:4, con tamaños diferentes y distribución editorial escalonada, sobre carbón. Se mantiene la adaptación móvil asimétrica.

Las imágenes se revelan al entrar en viewport y tienen desplazamientos verticales moderados con diferencias leves de ritmo. No se añadieron rotaciones ni efectos 3D. Se retiraron etiquetas numeradas y adornos redundantes. El cierre exacto permanece y su CTA a `/uniformes` utiliza el nuevo lima. La distribución sigue pendiente de validación visual, y la selección fotográfica final corresponde a una intervención posterior.

### 4. Casos reales

Colegio de Ingenieros del Perú, DecorCenter y Zoomlion conservan logos, textos y hechos originales. Se mantiene la navegación de carrusel, ahora sobre marfil, con logos más grandes y el testimonio **completo visible**. No hay enlaces a casos ni botones de destino ficticio.

Los paneles comparten la altura del contenido más largo para evitar saltos al cambiar de cliente. Las transiciones son suaves. Hay pestañas accesibles, controles anterior/siguiente, teclas izquierda/derecha/Home/End y desplazamiento horizontal táctil; se conserva el scroll vertical en móvil. No hay reproducción automática. El número de casos, índices y contador se derivan del arreglo de datos, para permitir ampliarlo.

### 5. Contacto

Se conserva la distribución y el fondo azul corporativo. Campos, área de mensaje y botón tienen radios coherentes de 14 px. El selector, si se incorporara en el futuro, utiliza el mismo tratamiento. El CTA es lima `#ABDF00` con texto carbón.

No se modificaron la lógica del formulario, campos, validaciones, contrato de envío, API, Resend, Turnstile, estados, variables de entorno ni `formulario_enviado`. El único cambio de JSX en el formulario fue retirar el prefijo decorativo de la etiqueta de sección; el redondeo se aplica mediante estilos de la variante Home.

### 6. Footer

Se conserva el fondo azul profundo y se eliminó la franja del texto gigante y la etiqueta redundante. Se compactaron sus espacios. Permanecen logo original, descripción corporativa, ambas direcciones, teléfono, correo, mapa, redes, tres enlaces legales y franja de derechos reservados. Destinos y datos empresariales no se modificaron.

## Archivos afectados en esta intervención

- `app/design-tokens.css`: lima definitivo y radio compartido.
- `components/Hero.tsx`: contenido, encuadre y tipeado secuencial con alternativa accesible.
- `components/ThreeReasons.tsx`: composición de pilares, símbolo original y eliminación del triángulo.
- `components/Basics.tsx`: presentación vertical, eliminación de adornos y ritmos de movimiento.
- `components/HomeExperience.tsx`: factor de velocidad por fotografía, conservando observadores y límites de desplazamiento.
- `components/Testimonials.tsx`: carrusel marfil, citas completas, altura estable, soporte táctil y cantidad de casos derivada de datos.
- `components/ContactForm.tsx`: retirada del prefijo decorativo; lógica sin cambios.
- `components/Header.tsx`: navegación real y menú responsive, preservando medición.
- `components/Footer.tsx`: retirada de los elementos superiores redundantes.
- `components/home.module.css` y `components/chrome.module.css`: estilos, encuadres, radios, secuencias y responsive.
- `docs/home-2027-review.md`: este documento actualizado.

No se modificaron dependencias, lockfile, archivos fotográficos, logos originales, API, páginas de Uniformes/Blog/Segmentos, metadatos de Home, sitemap, robots, scripts de GTM o configuración de infraestructura. La rama acumula también los cambios de las iteraciones anteriores respecto de `main`.

## Verificaciones

- `npm run build`: correcto; 126 páginas generadas y TypeScript incluido.
- `./node_modules/.bin/tsc --noEmit`: correcto.
- `npm run lint`: cero errores; cinco advertencias preexistentes sobre `<img>` en la página de proveedor, líneas 74, 155, 173, 191 y 209.
- Chromium/Playwright: prefijos de texto reales durante la escritura, orden de ambas líneas, tamaños relativos, color blanco, subtítulo y CTA. La geometría del titular no cambia durante la escritura. En esta carga local instrumentada se observó CLS inicial 0; no equivale a una medición de Core Web Vitals en producción.
- Pilares: textos completos, ausencia de trazos del triángulo, referencia al símbolo original y comprobación de posiciones/opacity durante la convergencia horizontal y caída posterior. Fondo de Cumplimiento verificado como `#01018B`.
- Carrusel: citas comparadas literalmente con `origin/main`, una imagen por caso —su logo—, cero enlaces a casos, altura estable, teclado, controles y gesto táctil.
- Formulario: lógica comparada literalmente con `origin/main`, cinco campos obligatorios, radios de 14 px y nuevo lima con texto oscuro. El intento local sin captcha muestra el mensaje original sin llamar a la API. `email_click` comprobado sin enviar un correo.
- Layout a 320, 390, 480, 768, 1024 y 1440 px: sin texto desbordado ni overflow horizontal, fotografías verticales y sin franjas vacías al desplazarlas. Menú móvil, Escape y devolución de foco comprobados.
- Doce destinos internos respondieron HTTP 200. Seis páginas que comparten encabezado/footer comprobadas a ancho móvil. Sin errores de ejecución del navegador.
- Movimiento reducido: contenido completo, cero animaciones activas y sin reiniciar el tipeado al cambiar de preferencia. Alternativa del titular sin JavaScript comprobada.
- Capturas completas de escritorio y móvil revisadas visualmente, incluido el encuadre de la cabeza de la aeromoza, pilares, prendas, carrusel, formulario y footer.

## Artefactos de revisión

- `/tmp/cotton-correction-review/home-1440.png`: Home completa en escritorio.
- `/tmp/cotton-correction-review/home-390.png`: Home completa en móvil.
- `/tmp/cotton-correction-review/hero-1440.png` y `hero-390.png`: encuadre del hero.
- `/tmp/cotton-correction-review/case-1.png`, `case-2.png`, `case-3.png`: tres casos completos.
- `/tmp/cotton-correction-review/recorrido.mp4`: recorrido de unos 33 segundos con tipeado, convergencia/caída y movimiento de prendas; también se conserva WebM.
- Scripts y registros auxiliares de esta sesión en `/tmp/cotton-correction-review`.

La compilación se sirve localmente en el puerto 3001, ruta `/`, desde `/workspace/cotton-country-web`, con `npm run start -- --hostname 0.0.0.0 --port 3001`. No es una publicación ni una URL pública.

## Pendientes y límites

La relación visual de las superficies con el isotipo y la distribución exacta de prendas requieren evaluación del propietario. La implementación técnica no supone su aprobación. Las fotografías actuales se han conservado sin sustituirlas y su selección definitiva sigue pendiente; no se añaden afirmaciones sobre su procedencia o sobre proyectos realizados.

El envío real con Resend y Turnstile no se probó por falta de credenciales de un entorno seguro. No se solicitan secretos ni se modifican credenciales de producción. Las pruebas locales bloquearon recursos externos de analítica, mapa y captcha; no validan sus respuestas remotas. Queda pendiente evaluación en dispositivos físicos y de Core Web Vitals reales.

Los testimonios conservan atribución y texto original, sin convertirse en resultados técnicos demostrados. El párrafo comercial, pies de familia y enfoques de caso existentes no se reescribieron. No hacer merge, push ni despliegue sin autorización expresa.
