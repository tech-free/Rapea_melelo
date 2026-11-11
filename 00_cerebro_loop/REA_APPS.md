# REA — Las 10 mejores apps de freestyle (nov 2026)

## Qué es este documento

Investigación de producto (reverse engineering de **funciones públicas**, no de código) sobre las apps más relevantes de entrenamiento de freestyle/rap improvisado. La lista numerada 1–25 se convirtió en un plan por etapas en **`PLAN_ETAPAS.md`**, aprobado por el usuario el 11 nov 2026. Ahora se implementan solo rimas y freestyle; grabación y beats quedan en parking.

**Límites y honestidad:**
- Fuentes: fichas de App Store/Google Play y sitios oficiales, consultadas en noviembre de 2026. No se copió código, assets ni textos de esas apps.
- No afirmo cómo funcionan por dentro. Las promesas de “IA que evalúa tu flow” son marketing hasta verificarlas; no las tomo como hechos.
- No se analizaron reseñas como verdad técnica, solo como señal de uso.
- Rapea es local-first, estática y sin backend. Todo lo que implique red social, cuentas o telemetría queda fuera salvo pedido explícito.

## Las 10 analizadas

| # | App | Plataforma | Qué hace bien (según ficha pública) | Lección para Rapea |
|---|-----|------------|--------------------------------------|--------------------|
| 1 | **RapApp: Freestyle y Batallas** | iOS/Android (ES) | 10 modos: Easy/Hard/Extreme, Temática, Personajes, Terminaciones, Ahorcado, Imágenes, Libre, Manual. Beats propios o importados. Planillas de jurado para FMS/Red Bull/Quinto Escalón, copas y ligas. Reto diario. | La variedad de modos es el producto; el modo Ahorcado y las Terminaciones son muy adaptables a nuestro formato. |
| 2 | **Red Bull Batalla** | iOS/Android (ES) | Modos “5 palabras” y “Temática”, beats oficiales, grabación de video con mezcla voz/beat, modo incógnito, comunidad, retos 1v1, inscripciones. | “5 palabras” es una mecánica simple y muy argentina. Grabar y escucharse es el hábito central. |
| 3 | **The Rhyme Game** | iOS/Android/web | Grilla de rimas sincronizada al beat, pelota que marca el pulso, esquemas AABB/AAAA, 4 niveles de ayuda (todas → primera → última → ninguna), diccionario, rachas. No evalúa voz. | La progresión quitando ayuda es la mejor curva de aprendizaje. El foco es la palabra en el beat, no el metrónomo. |
| 4 | **Rhymeable** | Android | Grilla de rima por BPM, 102 beats, importar MP3 con detección de tempo, modos Rhyme/Challenge/1v1, varios idiomas. | Importar el beat propio y etiquetar BPM. Batallas 1v1 como modo, no como red social. |
| 5 | **RapDrill** | Web | Generador de palabras, pistas de rima, modo sin micrófono o con micrófono (detección de palabras, no de calidad), dificultad, listas temáticas, drill diario, beats de YouTube. | El micrófono opcional debe medir solo “¿dijiste la palabra?”, nunca “¿qué tan bueno es tu rap?”. |
| 6 | **Rheemy** | Web | Pares de rima para explorar, “Find Rhymes” contrarreloj, entrenador de Setup & Punchline, slot machine, mapa de rimas, BPM 60–140. | Entrenar estructura (setup → remate) además de palabras sueltas. |
| 7 | **RappFlow** | Android | Evaluación por IA de coherencia, punchlines, flow y métrica; sincronización palabra-beat; grabación; compartir logros. | El resumen posterior a la sesión motiva. No prometer evaluación objetiva de calidad. |
| 8 | **Practica tu Freestyle** | iOS | Palabras aleatorias, métricas, objetos con imágenes, torneos con audio/video y clasificaciones. | Imágenes como disparador creativo. Los torneos requieren backend: fuera de alcance. |
| 9 | **Freestyle Rap (Khonsu)** | Android | Cues de rima e imágenes al beat, 50+ idiomas, velocidad de prompts ajustable, grabación de takes, vibración, beat store. | Separar “cada cuánto aparece un estímulo” del BPM. Vibración opcional ya la tenemos. |
| 10 | **Rap Fame** | iOS/Android | Estudio de grabación, biblioteca de beats, auto rhyme finder, concursos semanales, comunidad y feedback, charts. | Grabar y escucharse, más un buscador de rimas. La red social no encaja con nuestro local-first. |

**Menciones:** RapScript (generador de palabras), AutoRap (efecto novedad), Soundbrenner/Pro Metronome (precisión de metrónomo), Loopin (grabar/masterizar). No aportan nada nuevo para esta etapa.

## Patrones que se repiten en las mejores

1. **El loop es siempre el mismo:** estímulo → rapeás → siguiente estímulo. Cuanto menos fricción, mejor.
2. **La ayuda se retira de a poco.** Todas las palabras → primera → última → ninguna. Es la progresión más clara.
3. **Estructura > palabras sueltas.** Esquemas AABB/ABAB/ABBA, 4/8 barras, setup y punchline.
4. **El beat manda.** BPM visible, count-in, beats etiquetados, importar tu propio MP3.
5. **El micrófono es opcional.** Las mejores apps de entrenamiento no graban ni puntúan por defecto.
6. **Sesiones cortas + racha diaria.** El hábito se construye con 5–10 minutos.
7. **La comunidad es otro producto.** Requiere cuentas, moderación y backend; no es requisito para entrenar.

## Lista numerada de mejoras candidatas

> Elegí los números que te gusten. Cada ítem es una tarea chica y verificable. Los que dependen de fonética curada quedan bloqueados hasta R4 (revisión humana).

### A. Palabras y estímulos (el corazón de la app)

| # | Mejora | Qué hace | Inspiración | Esfuerzo | Impacto |
|---|--------|----------|-------------|----------|---------|
| 1 | **Modo 5 palabras** | La ronda te da 5 palabras al azar; tenés que usarlas en 4 barras. | Red Bull Batalla | S | ★★★ |
| 2 | **Ayuda progresiva** | Niveles: todas las rimas visibles → solo la primera → solo la última → ninguna. | The Rhyme Game | M | ★★★ |
| 3 | **Grilla de rima sincronizada** | La palabra que tenés que rematar cae en el tiempo exacto del compás, con una marca visual. | The Rhyme Game / Rhymeable | L | ★★★ |
| 4 | **Terminaciones forzadas** | La barra debe cerrar con una terminación o palabra dada. | RapApp / Rheemy | S | ★★★ |
| 5 | **Estímulos por temática** | Listas curadas: barrio, amor, flex, comida, calle, escuela. | RapDrill / RapApp | M | ★★☆ |
| 6 | **Estímulos con imágenes** | Objetos/emoji como disparador creativo, sin texto. | RapApp / Practica tu Freestyle | M | ★★☆ |
| 7 | **Modo personaje** | Rapeás como un personaje (el vecino, el porteño, el pibe del barrio). | RapApp | S | ★★☆ |
| 8 | **Modo ahorcado** | Adivinás la palabra y después la usás en la barra. | RapApp | M | ★★☆ |
| 9 | **Diccionario de rimas offline** | Tocás una palabra y ves rimas curadas (con sílabas cuando estén revisadas). | The Rhyme Game / Rap Fame | M | ★★★ |
| 10 | **Buscador por sílabas/terminación** | Filtrás palabras por cantidad de sílabas o final. | RapScript / Rap Fame | M | ★★☆ |
| 11 | **Drill diario + racha** | Un desafío fijo por día (misma semilla) y racha de días practicados. | RapDrill / Rhyme Game / RapApp | S | ★★★ |

### B. Flow y estructura

| # | Mejora | Qué hace | Inspiración | Esfuerzo | Impacto |
|---|--------|----------|-------------|----------|---------|
| 12 | **Contador de barras 4/8/16** | Muestra en qué barra vas y cuántas faltan; rondas configurables. | Rhyme Game / Rhymeable | S | ★★★ |
| 13 | **Count-in y final limpio** | Cuenta 4 pulsos antes de arrancar y cierra la toma sin cortar el flow. | General | S | ★★☆ |
| 14 | **Calibración de latencia** | Ajustás el desfase visual/audio tocando al pulso. | The Rhyme Game | M | ★★☆ |
| 15 | **Importar MP3 + BPM** | Cargás tu beat y la app detecta/etiqueta el tempo. | Rhymeable / RapApp | L | ★★★ |
| 16 | **Interrupción a mitad de verso** | Aparece una palabra nueva mientras rapeás; entrenás recuperación. | Rhymeable / Khonsu | S | ★★☆ |
| 17 | **Velocidad de estímulos** | Cada cuánto cambia el estímulo, independiente del BPM. | Khonsu | S | ★★☆ |

### C. Feedback y progreso

| # | Mejora | Qué hace | Inspiración | Esfuerzo | Impacto |
|---|--------|----------|-------------|----------|---------|
| 18 | **Grabación local de takes** | Grabás con el micrófono, escuchás y borrás; nada se sube. | Rap Fame / RappFlow / Red Bull | M | ★★★ |
| 19 | **Autoevaluación + resumen** | Al cerrar la ronda te puntuás flow/rima/letra y ves un resumen de la sesión. | RapApp / RappFlow | S | ★★☆ |
| 20 | **Mic opcional con detección de palabras** | Verifica si dijiste las palabras objetivo; aclara que no mide calidad. | RapDrill | L | ★★☆ |
| 21 | **Historial local + exportar JSON** | Sesiones, BPM y remates guardados en el dispositivo, con export. | RappFlow | S | ★★☆ |
| 22 | **Retos y logros locales** | Misiones (“3 rondas con las 5 palabras”) y XP sin ranking global. | RapApp / RapDrill | M | ★★☆ |

### D. Juego y compartir (opcional)

| # | Mejora | Qué hace | Inspiración | Esfuerzo | Impacto |
|---|--------|----------|-------------|----------|---------|
| 23 | **Batalla local 1v1** | Dos personas en el mismo dispositivo, turnos y planilla de jurado simple. | Rhymeable / Red Bull / RapApp | M | ★★☆ |
| 24 | **Planilla de jurado** | Puntuar flow, skills, puesta en escena y punchlines (para batallas reales). | RapApp | M | ★★☆ |
| 25 | **Tarjeta compartible + PWA** | Imagen/texto de tu sesión para compartir y app instalable offline. | Rap Fame / general | S | ★★☆ |

## Plan aprobado

El usuario aprobó el conjunto de las 25 mejoras. El orden, las dependencias y los criterios de aceptación están en **`PLAN_ETAPAS.md`**:

- **Etapa 1 (ahora):** 1, 4, 2, 12, 7 — la palabra y el remate.
- **Etapa 2 (ahora):** 13, 17, 16, 14, 3 — flow y tempo.
- **Etapa 3 (después de R4):** 5, 9, 10, 6, 8 — vocabulario y variedad.
- **Etapa 4 (después):** 11, 19, 21, 22 — hábito y progreso local.
- **Etapa 5 (después):** 23, 24, 25 — juego local y compartir.
- **Parking (no ahora):** 18 (grabación), 15 (importar beats), 20 (micrófono).

Con eso Rapea queda enfocada en palabras/flow, sin volverse una red social ni prometer IA que no podemos verificar.

## Lo que NO vamos a copiar

- **Evaluación “objetiva” por IA** de la calidad de tu rap: no hay evidencia pública de que funcione; sería marketing engañoso.
- **Red social, cuentas, rankings globales, torneos online**: requieren backend, moderación y datos personales; contradicen el local-first.
- **Suscripciones, anuncios y beat stores**: el juego debe seguir siendo gratis y sin fricción.
- **Beats con copyright**: usamos YouTube oficial o el beat del usuario.
- **Puntuar la voz como “talento”**: como mucho detectamos palabras, y lo decimos claro.

## Fuentes consultadas (nov 2026)

- RapApp: <https://rap-app.com/entrenar-freestyle> · <https://apps.apple.com/mx/app/rapapp-freestyle-y-batallas/id6759585370>
- Red Bull Batalla: <https://www.redbull.com/co-es/event-series/red-bull-batalla/batalla-app-faq> · <https://play.google.com/store/apps/details?id=com.redbull.batalla>
- The Rhyme Game: <https://www.therhymegame.com/> · <https://www.therhymegame.com/faq>
- Rhymeable: <https://rhymeable.com/>
- RapDrill: <https://www.rapdrill.com/>
- Rheemy: <https://rheemy.com/>
- RappFlow: <https://play.google.com/store/apps/details?id=com.rappflow>
- Practica tu Freestyle: <https://apps.apple.com/co/app/practica-tu-freestyle/id6502534128>
- Freestyle Rap (Khonsu): <https://play.google.com/store/apps/details?id=com.lyricspiration.freestyle>
- Rap Fame: <https://apps.apple.com/ag/app/rap-fame-rap-music-studio/id1476399789> · <https://rapfame.app/help/premium-purchases/what-is-included-in-premium>

## Estado de implementación

- **R11 (aplicada):** el control de tempo pasó de una tarjeta lateral dominante a una barra compacta. El desafío y la palabra son el bloque principal.
- **R11.2–R11.3 (aplicadas):** TAP de 38×22 px y barra de tempo de 42 px de alto, prácticamente del alto del título. En móvil la barra se acomoda en dos filas. Ver `screenshots/r11-tap-line.jpg` y `screenshots/r11-tap-mobile.jpg`.
- Las 25 mejoras están **planificadas por etapas** en `PLAN_ETAPAS.md`. **R12 (modo 5 palabras)**, **R13 (terminaciones forzadas)**, **R14 (ayuda progresiva)**, **R15 (contador de barras 4/8/16)** y **R16 (modo personaje)** están completadas. La Etapa 1 cerró; la próxima tarea activa es **R17 (count-in y final limpio)**, inicio de la Etapa 2.
