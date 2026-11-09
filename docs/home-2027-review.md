# Cotton Country 2027 · Corrección visual y funcional del Preview

Revisión local sobre `redesign-2027-home`, a partir del commit publicado `841987c736ca772e1aa9fbf7ccd9f2c2cfd66ca4`. No se ha creado otro commit, hecho push, merge o despliegue, ni cambiado la configuración de Vercel. El Preview publicado no contiene todavía esta revisión.

## Cambios realizados

- **Encabezado:** referencia de proporciones tomada del código de `origin/main`: barra de 80 px, logo de 40 px de alto en escritorio y navegación principal de 16 px, con separación de 24 px. Logo de 36 px en móvil. Se sustituye Soluciones por un único enlace **SizeSet → https://sizeset.com**, externo. Se conservan Uniformes y sus familias, Blog, Contacto, correo, menú responsive y `email_click`.
- **Hero:** misma fotografía, encuadre superior, degradado, titular, subtítulo, efecto de tipeado y tiempos aprobados. La lógica de la animación se comparó literalmente con el commit publicado y permanece idéntica. Un único CTA a `/uniformes`, sin icono lateral, con texto centrado, radio de 14 px y dimensiones de aproximadamente 263 × 50 px en escritorio y 259 × 50 px en móvil.
- **Paleta:** acento definitivo **#D7FF00**, con texto **#393535**. No quedan referencias visuales a los acentos anteriores `#ABDF00` o `#D7F34A` en `app` o `components`. Se mantienen azul corporativo `#01018B`, azul profundo `#04045E`, marfil `#F6F5F2`, blanco y fuentes locales Manrope/Inter.
- **Los detalles:** composición compartida, con Asesoría y Método alineados sobre el resultado azul. Las curvas asimétricas toman una referencia sutil del isotipo; se retira su reproducción aislada. Sin triángulos ni logotipos decorativos. Permanecen íntegros el titular, el párrafo y las tres descripciones. Asesoría entra desde la izquierda, Método desde la derecha y Cumplimiento desciende después. En móvil se apilan para facilitar la lectura. **Pendiente de aprobación visual.**
- **Prendas:** se conservan las cuatro fotografías y destinos originales. Marcos verticales 3:4, anchos y desplazamientos asimétricos, separaciones y pies más equilibrados. El movimiento se aplica al conjunto foto/nombre para mantenerlos alineados, con encuadre superior y hover moderado. Se conserva el cierre “Esto es solo una muestra. Hay mucho más por descubrir.” **Pendiente de aprobación visual.**
- **Nuestros clientes opinan:** título obligatorio y carrusel con pista horizontal real, transición suave, controles visibles Anterior/Siguiente, pestañas, flechas/Home/End y gesto táctil. Paneles inactivos excluidos de la interacción mediante `inert` y `aria-hidden`. Se mantienen los tres logotipos y testimonios completos originales, fondo marfil y altura estable entre paneles. No hay reproducción automática ni enlaces inventados. El contador y los paneles se derivan del arreglo de testimonios.
- **Contacto:** se conservan fondo azul y concepto de dos columnas. Se compactan espacios, tamaños, etiquetas y campos; el botón de 208 × 48 px deja de ocupar todo el ancho y centra su texto, con radio de 14 px y nuevo acento. El contenedor de Turnstile permanece disponible para el widget. Lógica del formulario idéntica a la publicada: campos, validaciones, Resend, Turnstile, estados y `formulario_enviado` sin cambios.
- **Footer:** logo de 120 px de ancho, columnas alineadas arriba, espaciado y títulos más contenidos. Todos los datos, direcciones, mapa, redes, enlaces legales y eventos permanecen; no se modificó el componente de contenido.

## Verificaciones realizadas

- `npm run build`: correcto; 126 páginas generadas.
- `./node_modules/.bin/tsc --noEmit`: correcto.
- `npm run lint`: cero errores, cinco advertencias preexistentes de `<img>` en la página de proveedor.
- Chromium real con Playwright: tipeado por prefijos, secuencia aprobada, segunda línea mayor, blanco, un único H1 y CTA, subtítulo y geometría estable. CLS inicial local observado: 0; no representa una medición de Core Web Vitals de producción.
- Animaciones de detalles: posiciones y opacidades verificadas durante la convergencia y descenso; textos originales y azul `#01018B` comprobados.
- Carrusel: citas comparadas literalmente con `origin/main`, tres logos originales, altura estable, desplazamiento, controles y teclado. Gesto táctil adicional probado mediante eventos nativos de Chromium a 390 px: avanza, retrocede y permite el scroll vertical sin cambiar de testimonio.
- Botones: colores, radio y centrado geométrico del texto comprobados en navegador.
- Formulario: cinco campos obligatorios y validación de seguridad original; un intento local sin captcha muestra el error previsto sin llamar a `/api/contact`. `email_click` comprobado interceptando la navegación de correo.
- Anchos de 320, 390, 480, 768, 1024 y 1440 px: sin desbordamientos horizontales ni textos recortados. Menú móvil, Escape y devolución del foco verificados.
- Once destinos internos devuelven HTTP 200. Seis páginas que comparten encabezado/footer revisadas también en móvil. Sin errores JavaScript de ejecución.
- Preferencia de movimiento reducido: contenido completo y sin animaciones activas; el tipeado no se reinicia al cambiar la preferencia. Alternativa del titular sin JavaScript comprobada.
- Revisión visual completa de capturas de escritorio a 1440 px y móvil a 390 px: encabezado, encuadre del hero, detalles, prendas, testimonios, formulario y footer.

## Archivos de esta revisión

`app/design-tokens.css`, `components/Header.tsx`, `components/Hero.tsx`, `components/ThreeReasons.tsx`, `components/Basics.tsx`, `components/Testimonials.tsx`, `components/ContactForm.tsx`, `components/home.module.css`, `components/chrome.module.css` y este documento.

No se modificaron dependencias, recursos originales, API, lógica de envío, páginas de catálogo, Blog, metadatos ni infraestructura.

## Capturas y reproducción local

- `/tmp/cotton-preview-review/home-1440.png`: Home completa de escritorio.
- `/tmp/cotton-preview-review/home-390.png`: Home completa móvil.
- `/tmp/cotton-preview-review/hero-1440.png` y `hero-390.png`: detalle del hero.
- `/tmp/cotton-preview-review/case-1.png`, `case-2.png`, `case-3.png`: testimonios en escritorio.
- `/tmp/cotton-preview-review/check.cjs` y `touch.cjs`: comprobaciones de navegador de esta sesión.

La compilación se sirve localmente en el puerto 3001 con `npm run start -- --hostname 0.0.0.0 --port 3001`. No constituye una publicación.

## Pendientes y límites

Las composiciones de detalles y prendas requieren la aprobación visual del propietario. La compilación correcta no supone su aprobación.

No se realizó un envío real con Resend o Turnstile. Las pruebas bloquearon solicitudes externas de captcha, analítica y mapa, por lo que no certifican sus respuestas remotas. La lógica existente y sus integraciones se preservaron. No se solicitaron credenciales ni se enviaron correos de prueba.

Los gestos se comprobaron con emulación táctil de Chromium; queda pendiente revisión en dispositivos físicos y medición de rendimiento en el entorno desplegado.

Se requiere autorización expresa posterior para un único push a `redesign-2027-home`. Hasta entonces, los cambios permanecen locales y Vercel Preview conserva la versión publicada anterior.
