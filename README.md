# Rapea — Gimnasio de freestyle

Entrená freestyle argentino con un metrónomo manual, desafíos de esdrújulas y doble tempo, y disparadores de rima rioplatenses. Es una app estática: no necesita cuenta ni servidor propio.

## Usar

Abrí `index.html` en un navegador moderno o serví esta carpeta localmente (por ejemplo, `python3 -m http.server 3002`) y entrá a `http://localhost:3002`.

1. Tocá **Marcar pulso** varias veces a ritmo constante para estimar el BPM. Los taps aislados se filtran; para adoptar un cambio de ritmo hacen falta dos intervalos consistentes. Las pausas largas reinician el historial de estimación y el rango mostrado es 40–240 BPM. El Tap Tempo es manual e independiente de cualquier audio.
2. Elegí la subdivisión y el desafío; seguí el compás visual 4/4 y la palabra disparadora. Podés elegir guía de rima **Libre**, **AABB**, **ABAB** o **ABBA**: muestra la letra de cada barra y resalta la actual al avanzar el pulso. Las rimas se revelan durante la ronda; la guía no evalúa tu voz.
3. Tocá **La hice** si querés registrar voluntariamente tu ronda. Las rachas y el récord se guardan localmente en este navegador; no se escucha ni puntúa la voz.
4. Opcionalmente, pegá una URL compatible de video o playlist de YouTube para abrir el reproductor visible de YouTube.

El botón de sonido activa el pulso audible y la vibración se usa solo cuando el dispositivo/navegador la admite. **Doble tempo** duplica el tempo de práctica mostrado, sin analizar ni sincronizar la pista externa. El pulso visual conserva aproximadamente su fase al cambiar el BPM y descarta ticks atrasados si el navegador se demora; pestañas en segundo plano pueden pausar o retrasar el reloj, que no garantiza precisión de audio. La disponibilidad, reproducción y restricciones de YouTube dependen de YouTube y del navegador.

## Implementación y verificación

Vanilla HTML, CSS y JavaScript, sin backend ni dependencias de build. La verificación del MVP incluyó `node --check app.js`, parseo HTML, y pruebas manuales en navegador de Tap Tempo, cambio de modo/subdivisión, revelado de rimas, registro/reset, validación de URL de YouTube y layout móvil. El reproductor aceptó la URL y abrió su marco; la reproducción externa/API no se pudo confirmar. No hubo errores de página/consola en la prueba de interacción.

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
