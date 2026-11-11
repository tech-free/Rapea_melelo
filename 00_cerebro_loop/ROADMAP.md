# ROADMAP DEL PROYECTO
*Marcar con [x] lo completado, [~] en progreso, [ ] pendiente.*

## 🚀 Funcionalidades Principales
- [x] MVP: Gimnasio web local-first de freestyle argentino con Tap Tempo, compás/subdivisiones, desafíos, rimas y reproductor oficial de YouTube; uso y límites documentados en `README.md` y `roadmap/MVP.md`.
- [x] R1–R3: Tap Tempo resistente, reloj cuantizado y esquema/validador de vocabulario local; detalles y pruebas en `roadmap/REA.md`.
- [ ] R4: Curar y revisar humanamente un lote pequeño de ejemplos rioplatenses antes de completar sílabas, acentos o familias fonéticas.
- [x] R5–R6: Explicar golpes por pulso/compás y añadir mejoras de accesibilidad, foco visible y vibración manual opcional; verificación móvil y evidencia en `screenshots/r6-mobile.jpg`.
- [x] R7: Patrones de remate opcionales (LIBRE/AABB/ABAB/ABBA) con regla visible, tira de barras y preferencia guardada localmente; no evalúa voz ni sustituye la curación fonética de R4.
- [x] R8: Mazo mezclado por modo que evita repetir estímulos hasta completar la vuelta (excluye el actual al rebarajar); verificado en 22 rondas sin repeticiones inmediatas y con cobertura completa por ciclo.
- [ ] R9–R10: Revisar métricas locales voluntarias y verificar el conjunto acumulado en navegador, teclado y móvil; sin audio grabado ni telemetría remota.
- [x] R11: Control de tempo compacto (barra de ~46 px útil, TAP de 46 px, BPM de 26 px) para que el desafío y la palabra sean el foco; verificado en escritorio 1280×900 y móvil 390×844 sin overflow.

## 🧭 Backlog REA de apps (elegir del 1 al 25)
- [ ] El usuario elige números de la lista de `REA_APPS.md`; cada número elegido se agrega acá como tarea [B] y se implementa de a una.
- [ ] Candidatas recomendadas por impacto: 1 (5 palabras), 2 (ayuda progresiva), 3 (grilla sincronizada), 4 (terminaciones), 12 (contador de barras), 18 (grabación local).

## 🛠️ Deuda Técnica y Mantenimiento (Tareas [C])
- [ ] Mantener coherentes código, documentación y pruebas en cada cambio; no asumir que existen artefactos `dist/`.
- [ ] Revisar accesos a datos externos o anulables y aplicar guardas/optional chaining donde corresponda; `state` de la app se inicializa de forma explícita, no convertir sus accesos internos a ciegas.
- [x] Revisar `console.log` en archivos JavaScript de producción: no se encontraron coincidencias en la última auditoría; repetir al tocar código.
- [ ] En cambios interactivos, ejecutar la app en navegador, probar teclado/táctil y viewport móvil, y revisar errores/avisos de consola.

## 🐛 Bugs Conocidos
- [x] No hay bugs confirmados pendientes registrados. La emulación de `navigator.vibrate` no demuestra respuesta háptica física; la vibración es opcional y Tap Tempo no depende de ella.
- [ ] Limitación de contenido: la curación fonética R4 necesita revisión humana; no completar pronunciaciones o rimas por inferencia.
