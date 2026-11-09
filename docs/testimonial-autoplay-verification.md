# Carrusel — evidencia funcional en Chromium

Base: `1669025552a3d723973fa68f23a229436723b37b`. Pruebas sobre la compilación de producción local del cambio, con tiempos reales; sin reloj virtual ni avance de tiempo simulado.

## Diagnóstico y corrección

El código anterior activaba una pausa persistente desde foco, tacto, pestañas y controles. Esa pausa no se liberaba automáticamente. También exigía una intersección del 25 % del área del carrusel.

La pausa persistente queda reservada al botón explícito Pausar/Reanudar. Anterior, Siguiente, pestañas y teclado reinician siete segundos; el foco no bloquea la rotación. El tacto pausa mientras dura el gesto y reanuda al terminar/cancelarse. Se observa la visibilidad de la sección con umbral cero. Se conserva la pausa por cursor y por pestaña oculta, y se respeta la preferencia real de movimiento reducido.

Mientras el cursor siga sobre el carrusel, incluidos sus controles, prevalece la pausa por hover. Al retirarlo, empieza un nuevo intervalo completo. Solo una pulsación explícita de Pausar conserva una pausa permanente hasta Reanudar.

No se cambian CSS, dimensiones, textos, tipografía, fotografías ni otras secciones. Se conserva el control accesible de pausa con el mismo diseño.

## Ciclo observado sin interacción

Los tiempos se miden desde la primera programación del temporizador al hacerse visible la sección. Durante el ciclo inicial no se hizo clic ni se generó ningún evento táctil. Las capturas se toman después de finalizar la transición; los tiempos de cambio indicados corresponden a la actualización real del estado del carrusel en el DOM. El JSON conserva también los disparos del temporizador para contrastarlos.

| Vista | Inicio | Testimonio 2 | Testimonio 3 | Regreso a testimonio 1 |
|---|---:|---:|---:|---:|
| desktop · 1366 × 768 | 0.031 s → 1 | 7.021 s → 2 | 14.029 s → 3 | 21.053 s → 1 |
| mobile · 390 × 844 | 0.032 s → 1 | 7.042 s → 2 | 14.063 s → 3 | 21.094 s → 1 |

Orden: Colegio de Ingenieros del Perú → DecorCenter → Zoomlion → Colegio de Ingenieros del Perú.

## Condiciones efectivas en las ocho muestras del ciclo

| Condición | Valor observado en ambas vistas |
|---|---|
| userPaused | false |
| hovered | false |
| touching | false |
| visible | true |
| pageVisible | true |
| reducedMotion | false |
| autoRunning | true |
| document.visibilityState | visible |
| matchMedia(prefers-reduced-motion: reduce).matches | false |
| Clics / eventos táctiles iniciales | 0 / 0 |
| Foco | BODY |
| Temporizadores activos / máximo simultáneo | 1 / 1 |

Las condiciones se exponen en el atributo diagnóstico `data-autoplay-state` de la región. No contienen datos personales ni cambian su presentación. El registro completo conserva las muestras, los cambios del atributo y las altas/bajas/disparos reales del temporizador.

## Interacciones verificadas

- Hover: `hovered=true`, `autoRunning=false`, cero temporizadores; el testimonio permanece durante más de siete segundos. Al salir, vuelve a avanzar tras un intervalo completo.
- Anterior y Siguiente: cambian inmediatamente, reinician el plazo y vuelven a avanzar sin pulsar Reanudar, aunque el foco siga en el botón.
- Teclado: Flecha derecha cambia y el ciclo continúa después de siete segundos, sin pausa persistente por foco.
- Tacto: entrada nativa de Chromium pausa con `touching=true`; al soltar tras el gesto horizontal cambia el testimonio y vuelve a avanzar automáticamente.
- Pausar explícitamente: `userPaused=true` y cero temporizadores, aun al retirar el cursor; Reanudar habilita el avance.
- Movimiento reducido: la consulta real cambia a true, `reducedMotion=true`, `autoRunning=false`, cero temporizadores y ausencia de avance tras más de siete segundos.
- Máximo simultáneo registrado: un temporizador en cada navegador. Sin errores de ejecución observados.

## Alcance y controles estáticos

- Único archivo de código: `components/Testimonials.tsx`. Datos del arreglo de testimonios y JSX visual conservados.
- Documento de evidencia: `docs/testimonial-autoplay-verification.md`.
- Build correcto: 126 páginas. TypeScript correcto. Lint sin errores y cinco advertencias preexistentes en la página de proveedor.
- Los registros y vídeos proceden de Chromium con viewport de escritorio y emulación móvil, no de un dispositivo físico ni del Preview remoto.
- En navegadores sin IntersectionObserver hay una alternativa de compatibilidad; ese caso no forma parte de la prueba nativa de Chromium.

## Artefactos de sesión

- `/tmp/cotton-autoplay-fix/desktop.mp4` y `mobile.mp4`: grabaciones completas; incluyen carga inicial, ciclo sin interacción y comprobaciones posteriores. El tiempo cero de la tabla es posterior al inicio del vídeo.
- `desktop.json`, `mobile.json`, `results.json` y `observed.log`: registros de condiciones y tiempos.
- `desktop-0s.png`, `desktop-7s.png`, `desktop-14s.png`, `desktop-21s.png` y sus equivalentes móviles: ocho capturas.
- `verify.cjs`: guion de la prueba con espera real.

Publicación autorizada: un commit final y un push a `redesign-2027-home`, sin merge ni cambios en main, producción o Vercel.
