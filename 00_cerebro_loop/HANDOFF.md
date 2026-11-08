# HANDOFF

## Estado actual
- Baseline local verificada en `http://localhost:3002`: página Rapea, interacción accesible, HTTP 200 para `/` y `/app.js`, consola Playwright limpia, `node --check app.js` y `git diff --check` pasan.
- R5 quedó implementado y verificado localmente: la leyenda explica pulso base, modo doble, subdivisiones, marcas por pulso y tasa por minuto. Playwright cubrió ×1/×2/×4 en ambos modos; capturas de escritorio y móvil 390 px revisadas, sin overflow ni errores/advertencias de consola. `node --check app.js` y `git diff --check` pasan.
- El checkpoint de R5 queda local y sin publicar. `origin/main` sigue divergente, con commits remotos sin integrar y commits locales adicionales; un merge previo chocó en `HANDOFF.md`, `app.js` y `roadmap/REA.md`. No resolverlo manualmente ni publicar hasta tener una ruta segura.
- R4 sigue bloqueado por revisión humana de los cuatro candidatos en `data/vocabulary-candidates.json`.

## Decisiones
- Mantener la app local-first y no modificar configuraciones salvo solicitud explícita.
- No resolver conflictos de merge manualmente; no hacer force-push.
- No usar GitHub Issues ni `gh`.

## Próximo paso inmediato
Resolver la divergencia entre esta rama y `origin/main` sin integración manual de conflictos; luego continuar con R4 solo cuando haya revisión humana o tomar R6 como tarea independiente.
