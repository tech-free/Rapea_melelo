# ROADMAP DEL PROYECTO
*Marcar con [x] lo completado, [~] en progreso, [ ] pendiente.*

## 🚀 Funcionalidades Principales
- [x] MVP: Gimnasio web local-first de freestyle argentino con Tap Tempo, compás/subdivisiones, desafíos, rimas y reproductor oficial de YouTube; uso y límites documentados en `README.md` y `roadmap/MVP.md`.
- [x] R1–R3: Tap Tempo resistente, reloj cuantizado y esquema/validador de vocabulario local; detalles y pruebas en `roadmap/REA.md`.
- [ ] R4: Curar y revisar humanamente un lote pequeño de ejemplos rioplatenses antes de completar sílabas, acentos o familias fonéticas.
- [x] R5–R6: Explicar golpes por pulso/compás y añadir mejoras de accesibilidad, foco visible y vibración manual opcional; verificación móvil y evidencia en `screenshots/r6-mobile.jpg`.
- [x] R7: Patrones de remate opcionales (LIBRE/AABB/ABAB/ABBA) con regla visible, tira de barras y preferencia guardada localmente; no evalúa voz ni sustituye la curación fonética de R4.
- [x] R8: Mazo mezclado por modo que evita repetir estímulos hasta completar la vuelta (excluye el actual al rebarajar); verificado en 22 rondas sin repeticiones inmediatas y con cobertura completa por ciclo.
- [ ] R9: métricas locales voluntarias; se implementa dentro de R29 (historial local), sin audio ni telemetría remota.
- [x] R10: verificación acumulada cubierta por el DoD de cada tarea (build, navegador, teclado, móvil y consola).
- [x] R11: Control de tempo compacto para que el desafío y la palabra sean el foco; verificado en escritorio 1280×900 y móvil 390×844 sin overflow.
- [x] R11.2–R11.3: TAP reducido a 38×22 px y barra de tempo de 42 px de alto, del alto del título; en móvil se acomoda en dos filas.

## 🗺️ Plan por etapas (ver `PLAN_ETAPAS.md`)

### Ahora — rimas y freestyle
- [ ] **Etapa 1 — La palabra manda:** R12 modo 5 palabras, R13 terminaciones forzadas, R14 ayuda progresiva, R15 contador de barras 4/8/16, R16 modo personaje.
- [ ] **Etapa 2 — Flow y tempo:** R17 count-in y final limpio, R18 interrupción a mitad de verso, R19 velocidad de estímulos, R20 grilla sincronizada, R21 calibración de latencia.

### Siguiente — cuando R4 esté revisada
- [ ] **Etapa 3 — Vocabulario y variedad:** R22 estímulos por temática, R23 diccionario de rimas offline, R24 buscador por sílabas/terminación, R25 estímulos con imágenes, R26 modo ahorcado.

### Después
- [ ] **Etapa 4 — Hábito y progreso local:** R27 drill diario + racha, R28 autoevaluación + resumen, R29 historial local + export JSON, R30 retos y logros.
- [ ] **Etapa 5 — Juego local y compartir:** R31 batalla local 1v1, R32 planilla de jurado, R33 tarjeta compartible + PWA.

### Parking — no ahora
- [ ] **P1** Grabación local de takes (REA 18).
- [ ] **P2** Importar MP3 + BPM (REA 15).
- [ ] **P3** Mic opcional con detección de palabras (REA 20).

## 🛠️ Deuda Técnica y Mantenimiento (Tareas [C])
- [ ] Mantener coherentes código, documentación y pruebas en cada cambio; no asumir que existen artefactos `dist/`.
- [ ] Revisar accesos a datos externos o anulables y aplicar guardas/optional chaining donde corresponda; `state` de la app se inicializa de forma explícita, no convertir sus accesos internos a ciegas.
- [x] Revisar `console.log` en archivos JavaScript de producción: no se encontraron coincidencias en la última auditoría; repetir al tocar código.
- [ ] En cambios interactivos, ejecutar la app en navegador, probar teclado/táctil y viewport móvil, y revisar errores/avisos de consola.

## 🐛 Bugs Conocidos
- [x] No hay bugs confirmados pendientes registrados. La emulación de `navigator.vibrate` no demuestra respuesta háptica física; la vibración es opcional y Tap Tempo no depende de ella.
- [ ] Limitación de contenido: la curación fonética R4 necesita revisión humana; no completar pronunciaciones o rimas por inferencia.
