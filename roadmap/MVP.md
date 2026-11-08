# MVP jugable — Rap Engine argentino

Descomposición de la solicitud [A] en entregas pequeñas y verificables:

- [x] [B1] Crear la app web estática y una experiencia de entrenamiento jugable, responsive y accesible.
- [x] [B2] Implementar Tap Tempo estable, reloj de compás 4/4, subdivisiones, feedback visual/háptico y tolerancia a cambios de BPM.
- [x] [B3] Añadir dinámicas de esdrújulas y doble tempo, estímulos rioplatenses, rimas locales y progreso/racha sin puntuación automática de voz.
- [x] [B4] Añadir carga segura de videos/playlists YouTube mediante IFrame Player API oficial, estados y controles visibles.
- [x] [B5] Verificar build y preview en navegador, corregir fallos, documentar límites y completar este roadmap en checkpoint.

## Evidencia y límites de verificación

- `node --check app.js` y parseo del HTML pasan; no hay pipeline de build configurado para esta app estática.
- Playwright verificó taps y estimación de BPM, habilitación de ronda/revelado de rimas, confirmación voluntaria, subdivisión, doble tempo, reset conservando récord, rechazo de URL no compatible, apertura/cierre del reproductor y viewport móvil de 390 px sin overflow. La prueba final no registró errores de página ni consola.
- El enlace válido abre el marco y muestra estado de preparación; reproducción efectiva/API de YouTube no confirmada (depende del servicio/navegador).
- Se añadió `favicon.svg` tras confirmar que `/favicon.ico` devolvía 404.

## Decisiones de alcance

- Browser-first, vanilla HTML/CSS/JS estático, sin backend ni descargas externas de audio.
- El tempo se estima por toque humano; no se analiza ni sincroniza automáticamente el audio externo.
- YouTube se reproduce en un iframe visible de su plataforma; su disponibilidad, restricciones y reproducción en segundo plano dependen de YouTube y del navegador.
- Diccionario inicial curado, compacto y ampliable. No se afirma tener 2.000 términos verificados ni NLP perfecto.
- Progreso y récords quedan en el dispositivo; la confirmación de acierto es voluntaria, no hay reconocimiento de voz.
