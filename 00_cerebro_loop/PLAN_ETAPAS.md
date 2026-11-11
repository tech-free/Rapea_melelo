# Plan por etapas — Rapea

> Estado: aprobado el 11 nov 2026. El usuario aprobó el conjunto de mejoras del REA y pidió dividirlo en etapas. **Ahora solo rimas y freestyle.** Grabación local, producción de beats y micrófono quedan en parking.

## Regla de oro

Cada etapa se termina antes de abrir la siguiente. Cada tarea es un commit atómico con:

- `node --check app.js`, parseo HTML, validador de vocabulario y pruebas.
- Playwright en `http://localhost:3002`: escritorio 1280×900 y móvil 390×844.
- Consola con 0 errores y 0 avisos; sin overflow horizontal.
- Teclado y táctil probados en los controles nuevos.
- README, roadmap y HANDOFF actualizados en el mismo commit.

Sin backend, sin cuentas, sin telemetría, sin audio subido y sin beats con copyright.

## Etapa 0 — Base ya construida

- [x] MVP: Tap Tempo, compás/subdivisiones, desafíos, rimas, YouTube y progreso local.
- [x] R1–R3: Tap Tempo resistente, reloj cuantizado y vocabulario local validado.
- [x] R5–R6: cuenta de golpes, accesibilidad, foco visible y vibración opcional.
- [x] R7–R8: patrones LIBRE/AABB/ABAB/ABBA y mazo sin repeticiones inmediatas.
- [x] R11: tempo compacto; TAP de 38×22 px y barra de 42 px, del alto del título. La palabra es el bloque principal.
- [ ] R4: revisión humana de fonética rioplatense. **Compuerta de la Etapa 3.**

## Etapa 1 — La palabra manda (ahora)

**Objetivo:** que cada ronda tenga una consigna de palabra clara y un remate con estructura. Es la identidad de Rapea.

| ID | REA | Tarea | Qué agrega | Tamaño | Aceptación |
|----|-----|-------|------------|--------|------------|
| R12 | 1 | **Modo 5 palabras** | Cinco palabras al azar por ronda; hay que usarlas en cuatro barras. | M | Las 5 son distintas, se ven juntas, no se repiten dentro de la ronda y el remate sigue funcionando. |
| R13 | 4 | **Terminaciones forzadas** | Una terminación o palabra obligatoria para cerrar la barra. | S | La terminación cambia por ronda, se ve antes del remate y no promete validación fonética. |
| R14 | 2 | **Ayuda progresiva** | Niveles: todas las rimas → solo la primera → solo la última → ninguna. | M | Cada nivel muestra la cantidad correcta de chips, se guarda la preferencia y se puede usar con teclado. |
| R15 | 12 | **Contador de barras 4/8/16** | Barra actual y total, con progreso visual. | M | El contador avanza con el reloj, se reinicia con la ronda y el patrón se repite bien en 8/16. |
| R16 | 7 | **Modo personaje** | Un personaje (vecino, porteño, pibe del barrio) condiciona la ronda. | S | El personaje aparece junto a la palabra, cambia por ronda y se puede desactivar. |

**Estado:** R12 ✅ completada (formato 1/5 persistido, cinco palabras distintas, remate en el tiempo 3). R13 ✅ completada (terminación opcional visible antes del remate). Próxima: R14.

**Orden de ejecución:** R12 ✅ → R13 ✅ → R14 → R15 → R16.

**Detalle mínimo por tarea:**

- **R12:** separar “formato de ronda” de “dinámica” para no mezclar esdrújulas con 5 palabras. El mazo de 5 palabras usa el mismo mezclador que R8. En móvil, las 5 palabras van en una grilla de 2 columnas.
- **R13:** lista local de terminaciones rioplatenses simples (`-ón`, `-ero`, `-ar`, `-ada`, `-ingo`). Se muestra como chip; no se evalúa si el usuario la usó.
- **R14:** el nivel se guarda en `localStorage`; el texto “APARECE EN EL TIEMPO 3” se adapta al nivel elegido.
- **R15:** el contador se alimenta del mismo tick que el beat; no crear un segundo reloj. El patrón de 4 barras se repite cada 4.
- **R16:** lista corta de personajes; sin imágenes externas. El modo es opcional y no cambia el mazo de palabras.

## Etapa 2 — Flow y tempo (ahora)

**Objetivo:** que la palabra caiga en el beat y que el usuario entrene recuperación, sin que el metrónomo vuelva a ser protagonista.

| ID | REA | Tarea | Qué agrega | Tamaño | Aceptación |
|----|-----|-------|------------|--------|------------|
| R17 | 13 | **Count-in y final limpio** | Cuatro pulsos antes de arrancar y cierre de ronda sin cortar. | S | El count-in suena/ve una vez, no se duplica al cambiar de modo y el final no dispara dos veces el remate. |
| R18 | 16 | **Interrupción a mitad de verso** | Una palabra nueva aparece en la barra 3; hay que incorporarla. | S | El cambio ocurre en el pulso elegido, la palabra anterior queda visible y se puede desactivar. |
| R19 | 17 | **Velocidad de estímulos** | Cada 2/4/8 pulsos cambia el estímulo, independiente del BPM. | S | El selector no altera el BPM ni el mazo; el cambio se ve en la barra correcta. |
| R20 | 3 | **Grilla sincronizada** | Rejilla de 4/8 casilleros con el pulso actual y el objetivo de rima. | L | El casillero activo coincide con el beat, no se desfasa al cambiar BPM y respeta `prefers-reduced-motion`. |
| R21 | 14 | **Calibración de latencia** | Ajuste visual de ±200 ms probando taps. | M | El offset se guarda, se puede volver a 0 y no modifica el cálculo del BPM. |

**Orden de ejecución:** R17 → R19 → R18 → R21 → R20. La grilla va última porque depende de que el reloj y el count-in estén estables.

**Detalle mínimo por tarea:**

- **R17:** reutilizar el scheduler existente; no usar `setTimeout` paralelo. El count-in es visual y opcional si el audio está silenciado.
- **R18:** el estímulo nuevo entra en la barra 3; si el patrón es AABB/ABAB/ABBA, se muestra qué barra cambió.
- **R19:** el valor por defecto sigue siendo “cada 4 pulsos” para no romper la experiencia actual.
- **R20:** la grilla es una capa visual sobre el prompt, no un editor de secuencias. En móvil se muestran 4 casilleros y se pagina en 8/16.
- **R21:** el offset afecta solo la pintura del beat, no el audio de YouTube ni el BPM.

## Etapa 3 — Vocabulario y variedad (después de R4)

**Objetivo:** ampliar el vocabulario sin inventar fonética. Esta etapa **no arranca** hasta que R4 tenga revisión humana.

| ID | REA | Tarea | Qué agrega | Tamaño | Aceptación |
|----|-----|-------|------------|--------|------------|
| R22 | 5 | **Estímulos por temática** | Listas curadas: barrio, amor, flex, comida, calle, escuela. | M | Cada tema tiene al menos 8 palabras únicas y se puede combinar con los modos. |
| R23 | 9 | **Diccionario de rimas offline** | Tocás una palabra y ves su familia curada. | M | Abre y cierra con teclado, no hace red y muestra “sin datos revisados” cuando corresponde. |
| R24 | 10 | **Buscador por sílabas/terminación** | Filtro por cantidad de sílabas o final. | M | Filtra sobre datos revisados, muestra estado vacío y no inventa sílabas. |
| R25 | 6 | **Estímulos con imágenes** | Emoji/objeto como disparador, sin texto. | M | Cada imagen tiene texto alternativo, no hay requests externos y se puede volver a palabra. |
| R26 | 8 | **Modo ahorcado** | Adivinás la palabra y después la usás en la barra. | M | 6 intentos, estado de victoria/derrota y paso automático al desafío. |

**Orden de ejecución:** R22 → R23 → R24 → R25 → R26. R23/R24 esperan el lote revisado de R4.

## Etapa 4 — Hábito y progreso (después)

**Objetivo:** que volver mañana sea fácil, sin ranking global ni cuentas.

| ID | REA | Tarea | Qué agrega | Tamaño | Aceptación |
|----|-----|-------|------------|--------|------------|
| R27 | 11 | **Drill diario + racha** | Desafío fijo por día y racha de días practicados. | S | La semilla cambia a medianoche local, el mismo día da el mismo drill y la racha se guarda local. |
| R28 | 19 | **Autoevaluación + resumen** | Puntuás flow/rima/letra al cerrar la sesión. | S | Se puede omitir, se guarda local y el resumen no se presenta como evaluación objetiva. |
| R29 | 21 | **Historial local + export JSON** | Sesiones, BPM, modo y remates en el dispositivo. | S | Export descarga JSON válido y “borrar historial” pide confirmación. |
| R30 | 22 | **Retos y logros locales** | Misiones (“3 rondas con las 5 palabras”) y XP. | M | El progreso persiste, no hay ranking global y los logros se pueden reiniciar. |

**Nota:** R9 (métricas locales) se implementa dentro de R29; R10 (verificación acumulada) queda cubierto por el DoD de cada tarea.

## Etapa 5 — Juego local y compartir (después)

**Objetivo:** jugar con otra persona en el mismo dispositivo y compartir la sesión, sin backend.

| ID | REA | Tarea | Qué agrega | Tamaño | Aceptación |
|----|-----|-------|------------|--------|------------|
| R31 | 23 | **Batalla local 1v1** | Dos personas, turnos de 4 barras y ganador simple. | M | Cambia de turno sin perder estado, no envía datos y se puede reiniciar. |
| R32 | 24 | **Planilla de jurado** | Puntuar flow, skills, puesta en escena y punchlines. | M | Suma total, funciona con teclado y se resetea con confirmación. |
| R33 | 25 | **Tarjeta compartible + PWA** | Imagen/texto de la sesión y app instalable offline. | M | La tarjeta se genera local, la app carga offline tras la primera visita y no pide cuentas. |

## Parking — no ahora

Estas tres mejoras quedan explícitamente fuera de las etapas activas. No se implementan hasta que el usuario las pida.

| ID | REA | Tarea | Por qué espera |
|----|-----|-------|----------------|
| P1 | 18 | **Grabación local de takes** | Necesita micrófono, permisos, `MediaRecorder`, reproducción y borrado; es otro producto y otro riesgo de privacidad. |
| P2 | 15 | **Importar MP3 + BPM** | Es producción de beats: entrada de archivos, detección de tempo, waveform y persistencia. |
| P3 | 20 | **Mic opcional con detección de palabras** | Depende de reconocimiento de voz, falsos positivos y permisos; nunca debe puntuar calidad. |

## Lo que no entra al plan

- Evaluación “objetiva” por IA de la calidad del rap.
- Red social, cuentas, rankings globales, torneos online y moderación.
- Suscripciones, anuncios, beat stores y beats con copyright.
- Puntuar la voz como “talento”.

## Criterio de avance

1. Terminar una tarea → verificar → commit atómico → checkpoint.
2. Terminar una etapa → jugar 10 rondas reales en escritorio y móvil.
3. Actualizar `HANDOFF.md` al cerrar cada etapa.
4. Si una tarea falla 3 veces, se revierte y se anota en `TODO.md`; no se arrastra deuda a la etapa siguiente.
