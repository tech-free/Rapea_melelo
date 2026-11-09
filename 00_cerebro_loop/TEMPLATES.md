# Plantillas de trabajo y Gauntlet Loop

Este archivo centraliza formatos reutilizables del cerebro. `AGENTS.md` es la autoridad para el ciclo de trabajo, verificación, commits y publicación; estas plantillas no lo reemplazan ni autorizan a saltar sus gates. El protocolo local explica el mapa documental en `PROTOCOL.md`; el estado y la cola viven en `HANDOFF.md`, `ROADMAP.md`, `TODO.md` y `USER_REQUESTS.md`.

## 1. Ficha de tarea

Copiar al `HANDOFF.md` al iniciar una tarea y completar solo lo necesario:

```md
### En progreso — [ID / nombre breve]
- Objetivo observable:
- Alcance y límites:
- Plan (3–6 pasos):
  1.
- Criterios de aceptación:
- Verificación prevista:
- Riesgos / dependencias:
```

Al cerrar, registrar resultado, comandos/pruebas, evidencia de navegador si corresponde, autocrítica y siguiente paso. Marcar la casilla de roadmap en el mismo cambio atómico que completa la tarea.

## 2. Registro de solicitud

Añadir a `USER_REQUESTS.md` al recibir trabajo externo. Mantener el original resumido, anotar el destino de seguimiento y marcarlo completo solo cuando la petición se haya satisfecho:

```md
- [ ] [Solicitud en una frase] — seguimiento: `[archivo o ID]`.
```

## 3. Bloqueo o descarte

En `TODO.md`, registrar el número real de intentos y la causa concreta. No contar como intento un bloqueo por dependencia humana/externa; no superar tres intentos. Tras tres fallos, marcar «REQUIERE HUMANO» y pasar a otra tarea.

```md
- [ ] Intento N/3 — [bloqueo o fallo reproducible]; siguiente acción: [paso concreto].
```

## 4. Prompt Gauntlet Loop — comparación de producto

Usar solo cuando se solicite un ciclo de construcción y crítica comparativa. Sustituir el objetivo y la barra por referencias concretas, accesibles y comparables; si no existe una barra adecuada, proponer 2–3 y esperar elección antes de ejecutar. Este prompt no convierte una referencia en permiso para copiar sus datos, código, diseño protegido o activos.

```text
Mejorá [objetivo concreto] para [personas/uso], preservando [límites explícitos].

La barra es [producto y URL pública concreta], en [flujo/pantalla comparable]. Obtené el artefacto real y comparalo directamente con el resultado, no con una descripción. Evaluá ambos en el mismo contexto/viewport cuando corresponda.

Dividí el objetivo en piezas pequeñas que puedan juzgarse por separado. Para cada pieza, ejecutá un builder y un crítico distinto con contexto fresco. El crítico debe inspeccionar el resultado real, compararlo a ciegas con la referencia, elegir cuál es mejor y nombrar la mayor brecha restante; después devuelve esa brecha al builder. Sé exigente: si nuestro resultado no gana, seguí iterando. No inventes datos, no copies contenido o implementación de la referencia y respetá los límites del proyecto.

Mantené una página breve de progreso con decisiones, evidencia y brechas abiertas. Seguí hasta que el crítico prefiera nuestro resultado; no declares victoria por puntuaciones autogeneradas. Usá subagentes paralelos para separar construcción y crítica. Si no hay navegador o acceso real a la referencia, detenete y reportá el bloqueo en lugar de simular la comparación.
```

### Barra inicial sugerida para la evolución de Rapea

Para comparar flujo de estímulos temporizados, usar la herramienta pública de RhymeFlux: <https://rhymeflux.com/tools/freestyle-rap-word-generator/>. Para comparar amplitud de dinámicas, consultar la página pública de funciones de RapApp: <https://rap-app.com/en>. Son referencias funcionales, no fuentes de contenido fonético ni autorización para reproducir interfaz, código o activos. Antes de ejecutar un Gauntlet visual, capturar el flujo real de ambas apps y escoger una sola barra comparable al alcance de la pieza.
