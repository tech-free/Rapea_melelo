# ROADMAP

- [x] MVP de entrenamiento de freestyle argentino; evidencia en `roadmap/MVP.md`.
- [x] R1: filtro robusto de Tap Tempo.
- [x] R2: reloj cuantizado con scheduler acotado.
- [x] R3: esquema JSON Schema 2020-12 para vocabulario local.
- [x] R7: guía visual Libre/AABB/ABAB/ABBA.
- [ ] R4: revisar humanamente un lote pequeño de ejemplos rioplatenses antes de aceptar acento, segmentación, familias fonéticas o etiquetas. Bloqueado hasta revisión humana.
- [x] R5: hacer explícitas las subdivisiones de doble tempo y probar x2/x4 en móvil/escritorio. Leyenda de pulso base, multiplicador de modo, subdivisiones, marcas por pulso y tasa por minuto; Playwright cubrió ×1/×2/×4 en ambos modos, a 109 y 111 BPM, escritorio y móvil 390 px sin overflow, consola limpia.
- [ ] R6: evaluar accesibilidad del pulso, sonido y vibración sin prometer precisión.
- [ ] R8: reducir repetición durante sesión y probar con conjuntos pequeños.
- [ ] R9: revisar métricas locales útiles, sin audio ni telemetría remota.
- [ ] R10: verificar cambios en navegador, teclado/táctil y viewport móvil; documentar.

Detalle y cautelas: `roadmap/REA.md`. Cada tarea requiere ejecución verde en navegador y checkpoint seguro.
