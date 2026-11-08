# HANDOFF del loop

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
