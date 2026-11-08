# HANDOFF del loop

## Estado heredado

- La última tarea documentada fue R2, reloj cuantizado. Está implementada y verificada en `roadmap/REA.md`; no hay código pendiente indicado.
- Build estático sin pipeline. Verificaciones conocidas: `node --check app.js`, parseo HTML y Playwright; consultar `HANDOFF.md` raíz para la evidencia previa.
- El siguiente trabajo sugerido es R3 (esquema de vocabulario local), después de resolver el censo de issues si se habilita `gh`.
- `gh auth status` estaba sin autenticar; no asumir que el censo remoto de issues se completó.

## Boot v6.0 completado

- Fetch y censo de ramas: detectadas `opencode-checkpoints/3` y `opencode-resume/9c6610b576cd74b4e795`; ambas se eliminaron del remoto.
- El checkpoint `opencode-checkpoints/3` entró en conflicto de contenido/add-add con código (`app.js` incluido); se abortó, se preservó en `graveyard-opencode-checkpoints-3` y se documentó en `CEMETERY.md`.
- `origin/main` quedó sincronizado sin divergencia. `node --check app.js`, parseo HTML y prueba Playwright en `localhost:3002` pasaron; interfaz completa y consola sin errores. Se interactuó con doble tempo y subdivisión ×2.
- `gh auth status` sigue sin autenticar; censo de issues y forensis de threads quedan bloqueados por esa limitación. No se cerraron issues.
- Branch actual `opencode/42520509585`; commits del BOOT listos para publicar fast-forward a `main`.

## Cierre — R3

- Contrato `data/vocabulary.schema.json` con JSON Schema Draft 2020-12 y registros iniciales en `data/vocabulary.json`; conserva `syllables`, `stressSyllable` y `phoneticFamily` como `null` con `reviewStatus: pending` hasta revisión humana.
- `scripts/validate-vocabulary.py` verifica el contrato y las invariantes no expresables en JSON Schema: IDs únicos/formato kebab-case y acento dentro del recuento silábico. `tests/test_vocabulary.py` cubre el dataset válido, duplicados, IDs malformados, acento fuera de rango y entradas/campos incompletos.
- Documentados dependencia opcional/comandos en `README.md`; R3 marcado en `roadmap/REA.md`. No se conectó el JSON a `app.js` ni se agregaron datos de rimas.
- Verificación: validator, cinco pruebas unittest, sintaxis JS, parseo JSON, `git diff --check`; navegador local visible y consola sin errores/avisos. Captura inspeccionada en `screenshots/r3-vocabulary.png` (ignorada).
- Censo de issues continúa bloqueado: `gh auth status` no encuentra sesión autenticada.

## Siguiente

- R4 exige revisión humana de ejemplos rioplatenses; no marcar fonética como revisada ni agregar rimas antes de esa revisión. Resolver el censo de issues cuando haya autenticación de `gh`.
