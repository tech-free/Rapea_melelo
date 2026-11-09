## Process lifecycle

- Run long-lived servers and watchers in a persistent session such as tmux.
- Do not background them in bounded commands without explicit detachment and cleanup.
- After a timeout, inspect the process and endpoint before retrying or claiming failure.

## Linux browser and WebGPU capture

- Use the preinstalled `playwright-cli` executable from Actions or SSH.
- Use its headed Chromium, persistent Xvfb display, and SwiftShader configuration.
- Run `playwright-cli open http://localhost:3002` for the Pascal development server.
- Load a saved scene. Wait for actual geometry and the active WebGPU renderer.
- Run `playwright-cli screenshot --filename=screenshots/linux.png` after creating the output directory.
- Inspect the image. Reject loading screens, empty grids, and blank canvases.
- Report SwiftShader as CPU software rendering. Do not claim GPU hardware acceleration.
- Inspect `$HOME/.local/share/omgithub-playwright/linux.json` for launch settings.
- Use `playwright-cli --help` for commands and named sessions. Pass configuration only to `open`.

## SOP omgithub

### Núcleo indestructible
1. Build verde → push fast-forward a `main`. Nunca force push.
2. Conflicto de merge → abort + tag + avisar. Nunca resolver conflictos a mano en autónomo.
3. Base roja → no trabajar encima: reparar o revertir a save tag verificado.
4. Al arrancar: leer HANDOFF y revisar el estado del último checkpoint antes de tocar código.
5. Toda tarea terminada = commit atómico + checkpoint. Sin excepciones.

### [1] Autoinstalación
- Solo la primera vez: si AGENTS.md no tiene esta sección, agregarla al final sin pisar lo existente.
- Escribir como última línea `── FIN DEL SOP ──` y checkpointear en ese commit (`save-000`).
- Boot: si AGENTS.md no tiene la línea de cierre, está corrupto; pedir el paste original y reinstalar antes de cualquier otra cosa.
- Crear faltantes: README.md, HANDOFF.md, todo.md, user-requests.md y /roadmap/.
- Repo vacío + boilerplate que exige build: esa exigencia es la tarea [A] semilla.
- Sesiones futuras arrancan con: «Seguí el SOP en AGENTS.md».

### [2] Boot
- Leer AGENTS.md → README.md → HANDOFF.md → /roadmap/ → todo.md → user-requests.md.
- Sync: si HEAD es ancestro de origin/main → reset --hard origin/main. Si divergen, merge limpio + rebuild. Conflicto → abort + pending-N + reporte.
- Triage huérfano: commits origin/main..HEAD o árbol sucio ajeno a HANDOFF; si coherente con «en progreso», adoptar; si no, descartar cambios ajenos y reportar.
- Gate baseline: build (+ tests). Rojo → P0, diagnosticar entorno/código. Revertir solo a save-NNN verificado en worktree temporal; si también falla, arreglar entorno.
- Sin tags save-*: `git tag save-000 && git push`.

### [3] Cola y loop externo
Prioridad: [P0] base roja > [A] usuario (chat + user-requests.md) > [B] roadmap > [C] mantenimiento > [D] green. Cada iteración: fetch, reevaluar cola, tomar una tarea, motor [4], checkpoint [5], volver.
- Cada 8 checkpoints (o 3 re-anclajes), cierre gracioso [10].
- Cola vacía → HANDOFF + checkpoint final + reporte + pausa.

### [4] Motor interno por tarea
- PLAN: leer archivos; mini-plan de 3–6 líneas en HANDOFF «en progreso».
- ACT: edición mínima, solo archivos del scope.
- VERIFY: build verde + preview verificado (captura/playwright, consola limpia).
- AUTOCRÍTICA: anotar «¿qué podría romper esto?». Riesgo serio → test o guarda.
- FIX: fallos de verify → diagnosticar, corregir y re-verificar (máx. 3 rondas).
- DONE: commit atómico `tipo(área): desc [ref]` + checkbox del roadmap en el mismo commit + README si cambió el comportamiento visible.
- Tareas [A]: descomponer primero en 3–10 checkboxes en todo.md o roadmap; luego ejecutar una a una como [B]. El manifiesto no es una tarea.
- DESCARTE: tras 3 rondas sin éxito, revertir archivos de la tarea, anotar motivo e intentos en todo.md, pasar a la siguiente.

### [5] Checkpoints
- DONE con build verde → `git push origin HEAD:main` fast-forward. Nunca force.
- Rechazo non-fast-forward → fetch + merge limpio + rebuild + push; conflictos → abort + pending-N + reporte. Loop sigue con [C]/[D], reintenta sync cada iteración; pausar tras 3 iteraciones con el mismo conflicto.
- Rechazo 403/permission → no reintentar; reportar una vez «falta permiso de push a main» y seguir sin checkpoint hasta resolución humana.
- Tag save-NNN solo con VERIFY aprobado (hito visible). Cada checkpoint es punto de muerte segura.

### [6] Libros
- HANDOFF.md: reescribir solo en pausa, cierre y re-anclaje (cada 5 tareas).
- todo.md: descartadas/bloqueadas con intentos (máx. 3 de por vida → «requiere humano»).
- user-requests.md: inbox externo; tachar al completar.
- roadmap/*.md: autogestionado; al completar un archivo, seguir con el siguiente.

### [7] Scope e higiene
Solo archivos del scope; cero refactors drive-by. Problema ajeno → todo.md. Sin reestructuraciones sin [A] explícita.

### [8] Recuperación
Main rojo heredado → revertir hasta verde (nunca force). Conflicto → abort + pending + reporte (única pregunta permitida). Muerte de sesión: recuperar el último checkpoint e inventariar los artefactos huérfanos antes de decidir si se adoptan o descartan.

### [9] Reportes (una línea)
- `▶ [P0/A/B/C/D] tarea | iniciando`
- `✓ tarea | checkpoint ok / save-NNN`
- `✗ descartada → todo.md | motivo`
- `⚠ conflicto | sha | (a) autorizar merge (b) sesión nueva`
- `⚠ pausa | unidades N | rescatado X | descartado Y | pendientes Z`

### [10] Cierre gracioso
En pausa/cola vacía/auto-pacing: HANDOFF actualizado, checkpoint final, reporte de 3 líneas: hecho / siguiente / riesgos.

### [C] Recurrentes
- Cada 5 checkpoints → playtest humano (revisión manual de lo acumulado).
- Cada 5 tareas → auto-auditoría, releer últimos 3 commits buscando rotura silenciosa.
- Cada 10 checkpoints → verificar que el último save-NNN aún compile en verde.

### Núcleo indestructible (repetir al final)
1. Build verde → push fast-forward a main. NUNCA force push.
2. Conflicto de merge → abort + tag + avisar. NUNCA resolver conflictos a mano en autónomo.
3. Base roja → no trabajar encima: reparar o revertir a save tag VERIFICADO.
4. Al arrancar: leer HANDOFF y revisar el estado del último checkpoint antes de tocar código.
5. Toda tarea terminada = commit atómico + checkpoint. Sin excepciones.

── FIN DEL SOP ──
