# Loop REA — evolución del gimnasio argentino

## Propósito y prioridad

Registrar la propuesta de ingeniería inversa y convertirla en una cola incremental para el juego existente. No es autorización para reescribir el MVP ni para implementar todo de una vez. Mantener el producto browser-first, estático, local-first y enfocado en freestyle argentino; cada casilla se toma como una tarea separada, con prueba y checkpoint.

**Prioridad inicial sugerida:** primero robustecer Tap Tempo y el reloj/subdivisiones; después enriquecer el diccionario fonético curado y sus dinámicas; luego sumar desafíos progresivos. La grabación/puntuación de voz, IA, paquetes regionales, telemetría remota y publicación móvil quedan fuera de alcance hasta una solicitud explícita.

## Estado del MVP que ya existe

- Tap Tempo manual, compás visual 4/4 y subdivisiones/modos de práctica.
- Rondas de esdrújulas y doble tempo, estímulos y familias de rima curadas.
- Feedback/racha voluntarios y guardado local; no se escucha ni puntúa la voz.
- Reproductor oficial visible para URLs compatibles de YouTube; no analiza ni sincroniza automáticamente el audio.
- Implementación vanilla HTML/CSS/JS estática, sin backend. Ver `MVP.md` y `README.md` para evidencia y límites.

## Mapa REA de 20 capas

Leyenda: **base** = ya hay una versión inicial; **cola** = posible mejora incremental; **exploración** = hipótesis que primero necesita diseño/evidencia; **fuera de alcance** = no implementar en este loop.

### UX y tiempo
1. Estímulos de palabras en pantalla — **base**; seguir mejorando legibilidad y accesibilidad.
2. Tap Tempo manual — **base**; robustecer cálculo y recuperación ante taps erráticos.
3. Estética de práctica nocturna/batalla — **base** en parte; ajustar solo con una tarea concreta de UX.
4. Filtro de latencia/outliers de taps — **cola**; ventana acotada, rechazo de intervalos imposibles y reinicio por pausa larga, con pruebas deterministas.
5. Predicción/cuantización visual de downbeat — **cola**; scheduler basado en reloj monotónico y actualización segura al cambiar BPM. El margen visual debe ser configurable/validado, no prometer precisión de audio.
6. Feedback háptico — **base** opcional; medir compatibilidad y evitar depender de vibración para timing exacto.
7. Compases y contratiempos — **cola**; empezar por 4/4 y subdivisiones que la interfaz pueda explicar; otros compases son expansión, no requisito del MVP.

### Datos lingüísticos
8. Índice fonético local — **cola**; comenzar con JSON curado e índices en memoria por familia/terminación. Reconsiderar SQLite/WASM solo si mediciones reales lo justifican.
9. Filtro por sílabas/complejidad — **cola**; incorporar metadatos revisados, sin inferir silabificación perfecta.
10. Etiquetas semánticas y coherencia — **cola**; etiquetas editoriales simples y opcionales.
11. Rima asonante e inclusividad fonética — **cola**; explicar las aproximaciones y validar ejemplos con hablantes argentinos.
12. Fatiga/repetición de palabras — **cola**; evitar repeticiones por sesión respetando el tamaño del diccionario.

### Dinámicas y práctica
13. Patrones (AABB, ABAB, ABBA) — **cola**; desafíos guiados, seleccionables y sin evaluación automática de voz.
14. Estímulos funcionales (objetos, imágenes, conceptos) — **cola**; priorizar conceptos argentinos curados.
15. Doble tempo/subdivisiones — **base**; definir claramente pulso, subdivisión x2/x4 y cómo cambia cada dinámica.
16. Punchline/remate en compás 4 — **exploración**; ofrecer estructura/prompt, no generar ataques dirigidos ni fingir que predice la calidad de una barra.
17. Diccionario regional dinámico — **fuera de alcance** para el foco actual “solo Argentina”; mantener arquitectura extensible sin construir paquetes de otros países.
18. Local-first — **base**; conservar datos en el dispositivo y evitar dependencias de red para el entrenamiento (salvo el reproductor externo elegido por el usuario).
19. Gimnasio mental sin presión social — **base**; progresión voluntaria y privada, sin ranking ni penalización social.
20. Analítica del flow — **exploración** local únicamente; definir consentimiento, minimización y utilidad antes de guardar más métricas. Sin telemetría remota.

## Plan incremental para el loop

### Fase 1 — núcleo temporal y datos
- [x] R1. Tap Tempo resistente: filtrar outliers y taps demasiado separados; cubrir primer tap, pausas, límites BPM y cambios durante una ronda. Implementado con tolerancia del 20%, dos intervalos consistentes para confirmar un cambio de ritmo, rechazo de intervalos menores de 250 ms o mayores de 1500 ms, reinicio de historial tras más de 2200 ms y BPM mostrado entre 40–240. Verificado con interacciones deterministas en Playwright.
- [x] R2. Reloj cuantizado: centralizar cálculo de beat/barra/subdivisión, limitar timers acumulados y mantener fase razonable al ajustar el tempo. Implementado con rejilla compartida y lookahead acotado; los cambios de BPM conservan el tick y la fase fraccional aproximada, y un atraso superior a 50 ms reancla el reloj en vez de acumular ticks. Verificado en Playwright con cambios de tempo, selección de modo/subdivisión, salto simulado de 5 s, reset y cero errores de página/consola; también pasó `node --check app.js` y parseo HTML.
- [x] R3. Esquema de vocabulario local: contrato JSON Schema Draft 2020-12 (`data/vocabulary.schema.json`), dataset inicial de 16 estímulos (`data/vocabulary.json`) y validador (`scripts/validate-vocabulary.py`). Sílabas, acento y familia fonética quedan `null`/pendientes hasta revisión humana; el validador comprueba estructura, IDs únicos y acento dentro del número de sílabas. Cinco pruebas cubren dataset válido, IDs duplicados/malformados, acento fuera de rango y entradas/campos incompletos. `jsonschema` es dependencia opcional del validador, no de la app estática; comandos en `README.md`.
- [ ] R4. Curar un lote pequeño de ejemplos rioplatenses antes de ampliar el vocabulario; revisar rimas, acentos y etiquetas con criterio humano.

### Fase 2 — rejilla y práctica avanzada
- [x] R5. Hacer explícitas las subdivisiones de doble tempo y probar visualmente x2/x4 en móvil y escritorio. La cuenta dinámica muestra subdivisión × dinámica, golpes por pulso base y golpes por compás 4/4; verificada en escritorio y viewport móvil (390×844) con modo Doble tempo ×2/×4, capturas `screenshots/r5-desktop.png` y `screenshots/r5-mobile.png`, consola sin errores ni avisos.
- [x] R6. Evaluar accesibilidad/legibilidad de pulso visual, sonido opcional y vibración compatible, sin presentarlos como reloj de precisión. El pulso se describe como orientativo; la vibración tiene control independiente y solo se solicita en taps manuales, con estado accesible/no disponible y manejo opcional de fallos. Se ajustaron foco visible y contraste del compás. Verificado en Playwright: API de vibración simulada disponible/no disponible, taps con/desactivado, teclado (Enter; BPM actualizado y foco visible), controles de sonido, viewport móvil 390×844 sin desbordamiento horizontal y consola sin errores/avisos. Captura inspeccionada: `screenshots/r6-mobile.jpg` (JPEG, 375×1570 CSS px, ancho menor a 1280). La emulación no verifica hardware háptico físico.
- [x] R7. Patrones de remate opcionales: selector LIBRE/AABB/ABAB/ABBA con regla visible y tira de cuatro barras que indica qué barras comparten rima. La elección se guarda localmente; no evalúa voz ni completa datos fonéticos pendientes de R4. Verificado en Playwright (escritorio y móvil 390×844, consola sin errores ni avisos).

### Fase 3 — progresión local
- [x] R8. Reducir repetición en la sesión y comprobar el comportamiento con conjuntos pequeños de vocabulario. Implementado con un mazo mezclado por modo: cada estímulo aparece una vez por vuelta, el rebarajado excluye el estímulo actual y el reinicio de sesión vuelve a mezclar. Verificado en 22 rondas continuas: sin repeticiones inmediatas y cobertura completa de los 8 estímulos por ciclo.
- [ ] R9. Revisar métricas locales útiles (p. ej., BPM habituales y rondas confirmadas voluntariamente); no guardar audio ni enviar telemetría.
- [ ] R10. Verificar los cambios acumulados en navegador, teclado/táctil y viewport móvil; actualizar README y evidencia del roadmap.

El orden es una sugerencia, no una promesa de calendario. Al cerrar cada tarea, marcarla, actualizar documentación de alcance si cambia el comportamiento y checkpoint antes de tomar la siguiente.

## Ideas recibidas que requieren cautela

- La propuesta llama “precisión matemática/milimétrica” a un reloj basado en JavaScript. En una pestaña de navegador hay variabilidad del event loop, ahorro de energía y suspensión en segundo plano; medir y reducir deriva sí es objetivo, garantizar precisión de audio no.
- Web Workers no pueden manipular el DOM ni hacen que `setInterval` se vuelva un reloj de audio exacto. Usarlos solo si una medición demuestra trabajo CPU que convenga aislar. Para temporización de audio, evaluar Web Audio API por separado; eso no sincroniza la app con el audio del iframe de YouTube.
- No asumir que downbeat equivale al primer tap: el usuario puede empezar en cualquier fase. Cualquier ayuda de fase debe ser explícita o guiada por el usuario.
- La fonética rioplatense no se resuelve reemplazando letras por símbolos: seseo, yeísmo rehilado, acento del voseo y pronunciaciones varían por hablante/registro. Guardar excepciones/metadatos curados; no afirmar cobertura exhaustiva.
- Los ejemplos de familias del texto original son semillas, no datos aprobados. Hay rimas discutibles o incorrectas y errores de acentuación/segmentación; revisar cada entrada antes de incorporarla.
- SQLite/Room/SwiftData son tecnologías nativas móviles, no encajan directamente con el MVP web estático. Empezar por JSON preindexado; medir antes de agregar WASM o persistencia compleja.
- Las afirmaciones sobre implementaciones internas y fallas de RapScript, RapApp, Soundbrenner y otros competidores son hipótesis no verificadas. No presentarlas como hechos ni replicar código sin fuentes confiables.
- El fragmento de `index.html` recibido es ilustrativo y está roto/incompleto: URL del SDK incorrecta para IFrame API, regex con marcadores, arrays sin inicializar y cadenas/template literals mal formados; no copiarlo. La integración existente y verificada del repo es la fuente de verdad.
- Mantener YouTube visible y oficial, con sus controles/restricciones. No ocultar el reproductor ni prometer reproducción en segundo plano, control irrestricto de playlist o sincronización automática.

## Criterios para cada entrega

- Una tarea acotada y un commit atómico; no mezclar refactors ajenos.
- `node --check app.js` y pruebas relevantes; para cambios interactivos, preview en navegador con errores de consola revisados y captura móvil cuando aplique.
- Comprobar que se conserva la independencia del Tap Tempo respecto del audio externo y que los datos siguen locales.
- Actualizar este plan, `README.md` si cambia el uso visible y `HANDOFF.md` al pausar/cerrar.
