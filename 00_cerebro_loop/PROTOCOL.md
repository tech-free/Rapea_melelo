# Protocolo del cerebro

`AGENTS.md` en la raíz es la fuente de verdad para BOOT, prioridades, alcance, verificaciones, commits, checkpoints, publicación y manejo de conflictos. Este documento solo orienta el uso del cerebro y no duplica ni contradice ese SOP.

- Antes de editar, leer el estado del cerebro y entender los cambios existentes; no incorporar ramas o checkpoints a ciegas.
- Ejecutar las verificaciones adecuadas al alcance. Los cambios interactivos requieren preview real en navegador y revisión de consola; cambios documentales requieren `git diff --check`.
- Completar una tarea con cambio atómico y el checkpoint definido por `AGENTS.md`. Nunca force-push ni resolver conflictos manualmente.
- Usar optional chaining y valores por defecto cuando el valor pueda faltar; no añadir guardas indiscriminadamente a estado que ya está inicializado.
- Mantener `HANDOFF.md` como estado/próximo paso, `ROADMAP.md` como cola, `TODO.md` como bloqueos, `USER_REQUESTS.md` como inbox y `CEMETERY.md` como registro de sesiones muertas.
- Los formatos reutilizables están en `TEMPLATES.md`. Las plantillas son ayudas: no sustituyen el SOP ni habilitan implementar propuestas aún no priorizadas/autorizadas.
- Preservar el límite de producto: no inferir ni añadir datos fonéticos; R4 requiere revisión humana. Las funciones de otras apps se registran como propuestas con fuente y cautelas antes de cualquier implementación.
