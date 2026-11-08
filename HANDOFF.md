# HANDOFF

## Estado

- R4 iniciado, no completado: `data/vocabulary-candidates.json` contiene cuatro estímulos candidatos con segmentación/acento orientativos, etiquetas provisionales y estados `pending`; no se conecta a la app ni asigna familias de rima. JSON Schema 2020-12, sintaxis de `app.js`, preview HTTP 200 y consola del navegador (cero errores/avisos) verificados. No hay revisión de una persona hablante disponible en esta ejecución, por lo que la revisión fonética/etiquetas sigue bloqueada y no se marcaron datos como aprobados. Próximo paso: revisión humana antes de completar R4 o incorporar estos datos.
- R3 completado localmente: `data/vocabulary.schema.json` define un esquema JSON Schema 2020-12 versionado para términos, sílabas/acentuación y estado de revisión, familia fonética, etiquetas opcionales y variantes argentinas; `data/README.md` documenta índices desde cero, límites de validación y cautelas fonéticas. No se migraron ni aprobaron rimas existentes. Schema check y fixtures válidos e inválidos pasaron; la app estática sigue cargando sin cambios visuales ni errores de consola. Riesgo pendiente para R4: toda clasificación fonética debe tener revisión humana; el esquema no promete exhaustividad.

- Completado localmente: guía opcional Libre/AABB/ABAB/ABBA. Libre muestra cuatro barras neutrales; los esquemas muestran sus letras y el pulso resalta la barra activa. Supuesto de producto: es solo una guía visual, sin evaluar la voz ni cambiar las rimas de la ronda. README actualizado.
- Verificación de esta entrega: Playwright comprobó las cuatro secuencias/selecciones, rotación del resaltado al avanzar el metrónomo, viewport móvil de 390 px sin overflow (documento 375 px) y cero errores/avisos de consola; captura JPEG inspeccionada: `screenshots/pattern-guide.jpg` (local/ignorada). También pasaron `node --check app.js`, parseo HTML y `git diff --check`.
- El checkpoint queda local en un commit atómico. No publicar: la rama de trabajo y `origin/main` siguen divergidas, con conflicto previo en `app.js`/`HANDOFF.md`; preservar ambas líneas y no resolverlo manualmente.
- R2 reloj cuantizado terminado y verificado; implementación y documentación incluidas en el checkpoint de esta tarea. El scheduler comparte la rejilla para beat/subdivisión/acento, usa lookahead acotado y descarta ticks vencidos tras atrasos; los cambios de BPM preservan el tick y una fase fraccional aproximada. Pruebas deterministas en Playwright cubrieron tempo cambiante, modo/subdivisión, atraso simulado de 5 s, reset y cero errores de página/consola. Pasaron `node --check app.js` y parseo HTML; captura inspeccionada: `screenshots/r2-clock.png` (ignorada por Git).
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

- Próximo loop: R4, curar un lote pequeño de ejemplos rioplatenses con revisión humana de rimas, acentos y etiquetas. El censo de issues sigue bloqueado hasta autenticar `gh`; publicación del branch de trabajo sigue bloqueada por la divergencia documentada.
- No asumir sincronización con YouTube, precisión de audio milimétrica ni la veracidad de afirmaciones no verificadas sobre competidores.
