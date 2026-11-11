# Rapea — Gimnasio de freestyle

Entrená freestyle argentino con un metrónomo manual, desafíos de esdrújulas y doble tempo, y disparadores de rima rioplatenses. Es una app estática: no necesita cuenta ni servidor propio. El control de tempo es una barra de una línea, con un TAP de 22 px; el protagonismo lo tienen la palabra, el remate y tu flow. El plan de mejoras está en `00_cerebro_loop/PLAN_ETAPAS.md`.

## Usar

Abrí `index.html` en un navegador moderno o serví esta carpeta localmente (por ejemplo, `python3 -m http.server 3002`) y entrá a `http://localhost:3002`.

1. Tocá **Marcar pulso** varias veces a ritmo constante para estimar el BPM. Los taps aislados se filtran; para adoptar un cambio de ritmo hacen falta dos intervalos consistentes. Las pausas largas reinician el historial de estimación y el rango mostrado es 40–240 BPM. El Tap Tempo es manual e independiente de cualquier audio.
2. Elegí el formato de ronda (**1 palabra** o **5 palabras**), la subdivisión y el desafío; seguí el compás visual 4/4 y la palabra disparadora. En **5 palabras**, la ronda muestra cinco palabras distintas y tenés que usarlas en cuatro barras; el remate se habilita en el tiempo 3. La opción **Terminación** agrega un cierre obligatorio por ronda (por ejemplo, `-ÓN` o `-ADA`) como guía de estructura; no se valida tu voz ni si usaste esa terminación. La cuenta muestra los golpes por pulso base: subdivisión ×1/×2/×4, multiplicada por ×2 al elegir Doble tempo (hasta 8 golpes por pulso, 32 por compás 4/4). Las rimas se revelan durante la ronda. Los estímulos salen de un mazo mezclado: no se repiten hasta completar la vuelta y el reinicio de sesión vuelve a mezclar. Opcionalmente elegí un patrón de remate (AABB, ABAB o ABBA): muestra qué barras comparten rima y se guarda en este navegador; es una guía de estructura, no evalúa tu voz ni valida pronunciaciones.
3. Tocá **La hice** si querés registrar voluntariamente tu ronda. Las rachas y el récord se guardan localmente en este navegador; no se escucha ni puntúa la voz.
4. Opcionalmente, pegá una URL compatible de video o playlist de YouTube para abrir el reproductor visible de YouTube.

El botón de sonido activa el pulso audible. La vibración es opcional, se activa por separado y solo se solicita al tocar **Marcar pulso**; puede no estar disponible aunque el navegador exponga esa función. **Doble tempo** duplica el tempo de práctica mostrado, sin analizar ni sincronizar la pista externa. El pulso visual es orientativo: conserva aproximadamente su fase al cambiar el BPM y descarta ticks atrasados si el navegador se demora; pestañas en segundo plano pueden pausar o retrasar el reloj, que no garantiza precisión de audio. La disponibilidad, reproducción y restricciones de YouTube dependen de YouTube y del navegador.

## Implementación y verificación

Vanilla HTML, CSS y JavaScript, sin backend ni dependencias de build. El vocabulario local y su contrato están en `data/vocabulary.json` y `data/vocabulary.schema.json`; los metadatos de pronunciación/rima permanecen pendientes (`null`) hasta revisión humana. Para validar el dataset y correr sus pruebas, instalá la dependencia opcional de desarrollo `python3 -m pip install jsonschema` y ejecutá `python3 scripts/validate-vocabulary.py` y `python3 -m unittest discover -s tests -v`. Esto no agrega dependencias a la app estática.

La verificación del MVP también incluyó `node --check app.js`, parseo HTML, y pruebas manuales en navegador de Tap Tempo, cambio de modo/subdivisión, revelado de rimas, registro/reset, validación de URL de YouTube y layout móvil. El reproductor aceptó la URL y abrió su marco; la reproducción externa/API no se pudo confirmar. No hubo errores de página/consola en la prueba de interacción.

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Remixed using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/tech-free/Rapea_melelo)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/tech-free/Rapea_melelo)

- 🎮 [Open the project](https://go.ondev.store/tech-free/Rapea_melelo).
- ✨ [Remix this project](https://go.ondev.store/tech-free/Rapea_melelo?remix=1).
- 💻 [Explore the source](https://github.com/tech-free/Rapea_melelo).
- 🛠️ [Check build runs](https://github.com/tech-free/Rapea_melelo/actions).
- 🐛 [Report an issue](https://github.com/tech-free/Rapea_melelo/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/tech-free).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
- 🧬 [Explore the remix source](https://github.com/tech-free/Rapea_melelo).
<!-- omgithub:readme:end -->
