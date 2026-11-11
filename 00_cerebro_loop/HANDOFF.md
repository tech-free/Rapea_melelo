# HANDOFF (Estado Actual)

## Última acción completada
R8 completada: mazo mezclado por modo que evita repetir estímulos hasta completar la vuelta; el rebarajado excluye el estímulo actual y el reinicio vuelve a mezclar. Antes se había cerrado R7 (patrones de remate LIBRE/AABB/ABAB/ABBA con regla visible y preferencia local).

## Estado del build/navegador
🟢 `node --check app.js` OK. Playwright en `http://localhost:3002`: 22 rondas continuas sin repeticiones inmediatas y con cobertura completa de los 8 estímulos por ciclo; taps manuales, revelado de rimas y registro de remate funcionando. Viewport móvil 390×844 sin overflow horizontal. Consola: 0 errores y 0 avisos. Capturas R7: `screenshots/r7-desktop.jpg`, `screenshots/r7-mobile.jpg`.

## Decisiones de diseño tomadas
- El patrón es una guía estructural de 4 barras; no promete validez fonética ni puntúa la barra.
- R4 sigue bloqueada por revisión humana; R7 no agrega datos de sílabas, acentos ni rimas.
- Se conserva el flujo previo: ronda/estímulo/rimas/hit y Tap Tempo independiente del audio externo.
- La publicación se reconstruyó sobre `origin/main` en una rama temporal para lograr un fast-forward limpio, sin merge ciego ni force push.

## PRÓXIMO PASO INMEDIATO
R9/R10: decidir si se guardan métricas locales útiles (sin audio ni telemetría) y verificar el conjunto acumulado en navegador, teclado y móvil.

## Contexto importante
- App estática de freestyle argentino, sin pipeline de build ni artefactos `dist/`.
- Censo remoto de issues sigue bloqueado por falta de autenticación `gh`; no usar `gh`.
- El cerebro vive en `/00_cerebro_loop/`; este archivo es la fuente de estado.

## Registro previo de estado
- Última revisión: Se actualizó `00_cerebro_loop/ROADMAP.md` al formato de funcionalidades, mantenimiento y bugs; se adaptaron `TODO.md` y este handoff para reflejar bloqueos y próximos pasos.
- El estado histórico de decisiones incluye revisión humana pendiente para R4, accesos internos al `state` inicializado y censo de issues bloqueado por falta de autenticación.
- Próximo trabajo de producto: proponer 2–3 referencias concretas y accesibles para el Gauntlet Loop y esperar elección; R4 requiere revisión humana.

## Cierre R6 — 9 nov 2026

- Evaluado `origin/opencode-checkpoints/8` por diff, sin merge. Se incorporaron selectivamente cambios de `app.js`, `index.html` y `styles.css` compatibles con R6; se excluyeron los metadatos de checkpoint/conversación y su HANDOFF ajeno.
- El pulso visual se presenta como orientativo; la vibración tiene control separado, es opt-in y solo se solicita en taps manuales. Se agregaron estados accesibles/no disponible, tolerancia a fallos, foco visible y mayor legibilidad del compás. README y R6 en `roadmap/REA.md` actualizados.
- Playwright: simulación de API compatible confirmó solicitud de 8 ms únicamente con vibración activada y tap manual; el caso sin API mostró el botón desactivado con etiqueta accesible y Tap Tempo siguió operativo. Teclado Enter actualizó el BPM, con foco visible de 2 px; sonido activado/desactivado actualizó `aria-pressed`. En viewport 390×844, contenido 375 px sin overflow horizontal. Consola: 0 errores/avisos.
- Captura full-page inspeccionada: `screenshots/r6-mobile.jpg`, JPEG 375×1570 CSS px (ancho <1280). La emulación no prueba vibración física. Verificación final: `node --check app.js`, validador del vocabulario, cinco pruebas `unittest` y `git diff --check` pasaron.
- Autocrítica: la función `navigator.vibrate` puede existir sin producir respuesta háptica real; la opción queda explícitamente opcional y no es requisito para usar Tap Tempo. R4 continúa pendiente de revisión humana de fonética rioplatense; censo remoto de issues bloqueado por falta de autenticación `gh`.

## Cierre auditoría Anti-TypeError — 8 nov 2026

- Barrido de `.type` en fuentes JS/TS (excluidos `_assets`, `dist`, dependencias y Git): `oscillator.type` solo se asigna; las dos lecturas del objeto `media` ahora usan optional chaining. El callback de YouTube ignora tipos desconocidos antes de acceder al ID.
- Verificación: `node --check app.js`, validador del vocabulario, cinco pruebas `unittest` y `git diff --check` pasaron. En `http://localhost:3002` se probaron Doble tempo, subdivisión ×2 y Tap Tempo; consola Playwright: 0 errores y 0 avisos. Captura `screenshots/anti-typeerror-audit.jpg` inspeccionada: interfaz renderizada correctamente.
- Autocrítica: `media` puede desaparecer entre la selección y el callback; las guardas cubren ese caso y evitan que tipos inesperados lleguen a `media.id`. El árbol es shallow y `git merge-base HEAD origin/main` no devuelve base; no publicar hasta confirmar una relación fast-forward. `gh` sigue sin autenticación para el censo remoto.

## Cierre R5 — 8 nov 2026

- R5 completada: la cuenta visible y accesible calcula subdivisión × dinámica y declara golpes por pulso base y por compás 4/4; README actualizado sin prometer precisión de audio. R4 sigue bloqueada hasta revisión humana de fonética rioplatense.
- Verificación: `node --check app.js`, validador del vocabulario, cinco pruebas `unittest` y `git diff --check`; navegador con Doble tempo ×2/×4 a viewport escritorio y móvil 390×844, capturas `screenshots/r5-desktop.png` y `screenshots/r5-mobile.png` inspeccionadas, consola sin errores/avisos.
- Autocrítica: los contadores expresan la rejilla lógica, no garantizan exactitud temporal de audio; los textos de README y roadmap conservan ese límite. `gh` sigue sin autenticación; censo/forensis de issues bloqueado.
- Próxima tarea: R4 requiere revisión humana explícita; mientras no llegue, no completar sílabas, acentos ni familias fonéticas por inferencia. Luego continuar R6.

## Boot 8 nov 2026

- Absorbido `origin/opencode-checkpoints/5` (`3c72949`) por fast-forward; el checkpoint solo actualizaba metadatos de `.omgithub`. Publicado en `main` sin divergencia y eliminada la rama remota absorbida. No había ramas `opencode-resume/*`; no se tocaron ramas `opencode-deployments/*`.
- Verificación de base: validador del vocabulario, cinco pruebas `unittest`, `node --check app.js`, parseo HTML y `git diff --check` pasaron. Preview en `http://localhost:3002`: interfaz cargada, modo Doble tempo y subdivisión ×2 interactivos, captura `screenshots/linux.png` inspeccionada y consola sin errores/avisos.
- Se limpiaron los `__pycache__` generados por las pruebas. No se creó otro tag `save-*`: `save-000` ya existe y este checkpoint no cambia código de producto.
- `gh auth status` continúa sin autenticar; censo de issues y forensis remotos pendientes de acceso humano.

## Estado heredado

- R3, esquema del vocabulario local, quedó implementado, verificado y publicado en `main` (`4aa6e7d`, tag `save-003`).
- Build estático sin pipeline. Verificaciones de R3: validador Python, cinco pruebas `unittest`, `node --check app.js`, parseo JSON y Playwright; ver `HANDOFF.md` raíz.
- El siguiente trabajo de producto es R4 (curación fonética humana), sin poblar pronunciaciones o rimas hasta revisión.
- `gh auth status` estaba sin autenticar; no asumir que el censo remoto de issues se completó.

## Boot v6.0 completado

- Fetch y censo de ramas: detectadas `opencode-checkpoints/3` y `opencode-resume/9c6610b576cd74b4e795`; ambas se eliminaron del remoto.
- El checkpoint `opencode-checkpoints/3` entró en conflicto de contenido/add-add con código (`app.js` incluido); se abortó, se preservó en `graveyard-opencode-checkpoints-3` y se documentó en `CEMETERY.md`.
- `origin/main` quedó sincronizado sin divergencia. `node --check app.js`, parseo HTML y prueba Playwright en `localhost:3002` pasaron; interfaz completa y consola sin errores. Se interactuó con doble tempo y subdivisión ×2.
- `gh auth status` sigue sin autenticar; censo de issues y forensis de threads quedan bloqueados por esa limitación. No se cerraron issues.
- Branch actual `opencode/42520509585`; BOOT y R3 están publicados fast-forward en `main`. El checkpoint R3 es `save-003`.

## Cierre — R3

- Contrato `data/vocabulary.schema.json` con JSON Schema Draft 2020-12 y registros iniciales en `data/vocabulary.json`; conserva `syllables`, `stressSyllable` y `phoneticFamily` como `null` con `reviewStatus: pending` hasta revisión humana.
- `scripts/validate-vocabulary.py` verifica el contrato y las invariantes no expresables en JSON Schema: IDs únicos/formato kebab-case y acento dentro del recuento silábico. `tests/test_vocabulary.py` cubre el dataset válido, duplicados, IDs malformados, acento fuera de rango y entradas/campos incompletos.
- Documentados dependencia opcional/comandos en `README.md`; R3 marcado en `roadmap/REA.md`. No se conectó el JSON a `app.js` ni se agregaron datos de rimas.
- Verificación: validator, cinco pruebas unittest, sintaxis JS, parseo JSON, `git diff --check`; navegador local visible y consola sin errores/avisos. Captura inspeccionada en `screenshots/r3-vocabulary.png` (ignorada).
- Censo de issues continúa bloqueado: `gh auth status` no encuentra sesión autenticada.

## Siguiente

- R4 exige revisión humana de ejemplos rioplatenses; no marcar fonética como revisada ni agregar rimas antes de esa revisión. Resolver el censo de issues cuando haya autenticación de `gh`.
