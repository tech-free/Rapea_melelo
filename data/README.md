# Esquema de vocabulario local

`vocabulary.schema.json` define la forma del futuro vocabulario curado de Rapea. Esta entrega aporta **solo el esquema**: no migra los disparadores de `app.js`, no agrega palabras ni certifica rimas existentes. La aplicación todavía usa sus datos actuales en memoria.

## Convenciones de versión 1

- El documento raíz declara `schemaVersion: "1.0.0"`, `language: "es-AR"` y una lista `entries`. Los `id` son identificadores estables en minúsculas separados por guiones; quien prepare un lote debe evitar IDs duplicados.
- Cada entrada tiene `term`, `phonology` y `phoneticFamily`. `phonology.syllables` conserva la segmentación ortográfica revisada, en orden; `stressSyllable` es el índice **desde cero** de la sílaba tónica. El índice debe quedar dentro de la secuencia, una relación que el JSON Schema estándar no puede expresar por sí solo.
- `reviewStatus` distingue `pending` de `reviewed`; tener campos completos no significa que estén aprobados. Marcar `reviewed` requiere revisión humana de la segmentación y del acento. Las notas pueden registrar casos dudosos.
- `phoneticFamily` es `null` mientras no haya una asignación revisada, o un objeto con ID y estado de revisión. Una familia es una agrupación curada para el uso del juego, no una prueba automática de rima.
- `labels` es opcional y contiene etiquetas editoriales simples. `argentineVariants` también es opcional; sus registros guardan forma, variedad/región descriptiva, estado de revisión y, cuando haga falta, fonología y notas de pronunciación específicas.
- Las convenciones no intentan codificar todos los sonidos del español con una sustitución de letras ni describir exhaustivamente las variedades argentinas. Seseo, yeísmo/rehilamiento, voseo, registro y variación entre hablantes requieren notas y revisión contextual. Las etiquetas regionales son descriptivas, no una taxonomía completa.

`vocabulary-candidates.json` es un borrador local de cuatro estímulos rioplatenses para R4. Todas sus entradas siguen en `pending`, las familias fonéticas permanecen en `null` y el archivo no se carga en la aplicación. Las etiquetas también son provisionales: el esquema no les da un estado de revisión propio, así que no deben interpretarse como aprobadas. Antes de promover cualquier registro hacen falta hablantes/revisores humanos que confirmen forma, sílabas, acento, registro y etiquetas; solo entonces se pueden asignar familias justificadas y marcar los campos revisados. No tratar ejemplos actuales ni datos de propuestas anteriores como aprobados por este esquema.
