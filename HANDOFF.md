# HANDOFF

## Estado

- R17 count-in y final limpio: entrada visual de 4 pulsos (1→2→3→4) al arrancar el reloj, sin repetirse al cambiar de modo; el remate se dispara una sola vez por ronda y un clic temprano no altera las estadísticas. Verificado en escritorio y móvil, consola sin errores/avisos. Capturas: `screenshots/r17-countin-desktop.jpg`, `screenshots/r17-countin-mobile.jpg`.
- R16 modo personaje: rol breve por ronda que condiciona el enfoque, cambia sin repetir de inmediato, se puede desactivar y no altera el mazo de palabras. Verificado con 1 y 5 palabras, escritorio y móvil, consola sin errores/avisos. Capturas: `screenshots/r16-character-desktop.jpg`, `screenshots/r16-character-mobile.jpg`.
- R15 contador de barras 4/8/16: barra actual, total y progreso; ronda de 4/8/16 compases, ciclo del patrón cada 4 barras y remate revelado en la última barra. Verificado en escritorio y móvil, consola sin errores/avisos. Capturas: `screenshots/r15-bars-desktop.jpg`, `screenshots/r15-bars-mobile.jpg`.
- R14 ayuda progresiva: TODAS, 1ª, ÚLTIMA o NINGUNA rima, con preferencia persistida y navegación por teclado. Verificado en escritorio y móvil, consola sin errores/avisos. Capturas: `screenshots/r14-desktop.jpg`, `screenshots/r14-mobile.jpg`.
- R13 terminación obligatoria opcional: cierre por ronda (`-ÓN`, `-ERO`, `-AR`, `-ADA`, `-INGO`, `-UELA`, `-ISMO`, `-AJE`), visible antes del remate, con preferencia persistida y sin validación de voz. Verificado en escritorio y móvil, consola sin errores/avisos. Capturas: `screenshots/r13-desktop.jpg`, `screenshots/r13-mobile.jpg`.
- R12 modo 5 palabras: formato de ronda 1/5 independiente de la dinámica, cinco palabras distintas por ronda, remate en el tiempo 3 y preferencia persistida. Verificado en escritorio y móvil, consola sin errores/avisos. Capturas: `screenshots/r12-cinco-desktop.jpg`, `screenshots/r12-cinco-mobile.jpg`.
- R11.2–R11.3: TAP de 38×22 px y barra de tempo de 42 px de alto, prácticamente del alto del título; en móvil se acomoda en dos filas.
- REA de 10 apps convertido en plan por etapas en `00_cerebro_loop/PLAN_ETAPAS.md`: Etapa 1 completa (palabra), Etapa 2 en curso (flow y tempo), Etapa 3 esperando R4, Etapas 4–5 después y parking para grabación, beats y micrófono. Próxima tarea: R19 (velocidad de estímulos).
- R8 mazo de estímulos sin repetición inmediata terminado: cada estímulo aparece una vez por vuelta, el rebarajado excluye el actual y el reinicio mezcla de nuevo; verificado en 22 rondas continuas. Consola sin errores/avisos.
- R7 patrón de remate opcional terminado: selector LIBRE/AABB/ABAB/ABBA con regla visible, tira de cuatro barras y preferencia guardada en `localStorage`; no evalúa voz. Verificado en Playwright (≈118 BPM, remate registrado, móvil 390×844 sin overflow) con consola sin errores/avisos. Capturas: `screenshots/r7-desktop.jpg`, `screenshots/r7-mobile.jpg`.
- R3 esquema de vocabulario local terminado: Draft 2020-12, 16 estímulos iniciales, metadatos fonéticos pendientes (`null`) y validador para estructura/IDs/índice de acento. Pasaron `python3 scripts/validate-vocabulary.py`, cinco pruebas `unittest`, `node --check app.js`, parseo JSON y `git diff --check`. Preview Playwright en `http://localhost:3002` cargó con cero errores/avisos; captura inspeccionada: `screenshots/r3-vocabulary.png` (ignorada por Git). La app no incorpora dependencia; `jsonschema` solo se necesita para validar.
- R2 reloj cuantizado terminado y verificado; implementación y documentación incluidas en el checkpoint de esa tarea. El scheduler comparte la rejilla para beat/subdivisión/acento, usa lookahead acotado y descarta ticks vencidos tras atrasos; los cambios de BPM preservan el tick y una fase fraccional aproximada. Pruebas deterministas en Playwright cubrieron tempo cambiante, modo/subdivisión, atraso simulado de 5 s, reset y cero errores de página/consola. Pasaron `node --check app.js` y parseo HTML; captura inspeccionada: `screenshots/r2-clock.png` (ignorada por Git).
- R1 Tap Tempo verificado y checkpointed en `4000a98` (`fix(tempo): filtrar taps erráticos y recuperar pulso [R1]`), publicado fast-forward en `main`. La prueba cubrió filtro de outliers, adopción de un nuevo pulso, rechazo de taps rápidos, límites de 40–240 BPM y recuperación tras pausas. Captura: `screenshots/r1-tap-tempo.png`; consola: 0 mensajes.
- MVP terminado en la branch `opencode/42458663446`; commit `8cf73b8` (`feat(mvp): crear gimnasio de freestyle argentino`) se publicó fast-forward en `main` correctamente.
- Se registró la nueva propuesta REA en `roadmap/REA.md`: mapa de 20 capas, backlog incremental y cautelas técnicas/de alcance. No se implementó el código ilustrativo recibido.
- Se agregó favicon SVG después de reproducir el 404 de `/favicon.ico`.
- Verificación: `node --check app.js`, parseo HTML y Playwright en escritorio/móvil. Flujos probados: Tap Tempo, compás/rondas, rimas, modos/subdivisión, progreso local/reset, validación de URL y apertura/cierre del reproductor. No hubo errores de página/consola; el layout móvil de 390 px no presenta overflow.
- No existe pipeline de build configurado. YouTube abrió su marco y quedó en estado de preparación; reproducción efectiva/API no comprobada.
- `gh auth status` informa que no hay host autenticado, así que no fue posible censar issues. Aunque `git push origin HEAD:main` sí publicó el checkpoint fast-forward, no inferir que `gh` quedó autenticado.

## Decisiones mantenidas

- App vanilla estática, sin backend; Tap Tempo manual e independiente del audio externo.
- Reproductor oficial visible de YouTube; disponibilidad y reproducción dependen del servicio y del navegador.
- Vocabulario curado local, acierto voluntario y progreso en el dispositivo. Sin reconocimiento de voz ni puntuación automática.

## Verificación / riesgos conocidos

- Detalle reproducible y límites en `roadmap/MVP.md`; instrucciones de uso en `README.md`.
- El scheduler visual no garantiza precisión nativa de audio y puede pausarse en pestañas de fondo.
- La guía de rimas es un apoyo, no una autoridad fonética exhaustiva.
- La integración externa de YouTube queda sujeta a restricciones de plataforma/navegador.

## Próximo

- Censo de issues y forensis siguen bloqueados hasta autenticar `gh`; no se cerraron issues.
- R3 queda completado y checkpointed. R4 requiere revisión humana de ejemplos rioplatenses antes de completar fonética o ampliar datos; mantener los campos revisados como `null` mientras no haya esa revisión.
- `jsonschema` se usa solo para validar datos, no para ejecutar la app. Comandos y alcance en `README.md`.
- No asumir sincronización con YouTube, precisión de audio milimétrica ni la veracidad de afirmaciones no verificadas sobre competidores.
