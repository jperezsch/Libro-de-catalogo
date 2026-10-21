# Libro de Catálogo (WikiTaxa)

App web instalable para el registro y manejo de colecciones biológicas del Área Zoología de Invertebrados (MNHNCL). Continuación de [Libreta de Campo](../Libreta-de-campo): recibe los datos de terreno y los completa con ingreso, preparación, catalogado y manejo.

- **Instalación:** abrir `instalar.html` en Chrome o Edge.
- **Archivos:** `index.html` (la app completa), `manifest.json`, `sw.js` (service worker), íconos e `instalar.html`.
- **Publicar una versión nueva:** subir el `index.html` nuevo y el `sw.js` con el número de `CACHE_NAME` incrementado. GitHub Pages la publica en pocos minutos y las apps instaladas la recogen solas.
- **Datos:** viven en el navegador de cada equipo (IndexedDB). Una actualización no los toca. 

