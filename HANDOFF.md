# HANDOFF

## En progreso

- R6: hacer explícita la vibración opcional (solo en el tap manual), mejorar el foco de teclado y el contraste del compás, y aclarar que el pulso visual es aproximado. Verificar control compatible/no compatible en Playwright, consola, build checks y captura.

## Estado

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
