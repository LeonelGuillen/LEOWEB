# leoguillen-web

Sitio personal de Leonel Guillén Hernández. HTML, CSS y JavaScript estáticos, sin paso de build.

## Despliegue en Cloudflare Pages.

1. Cloudflare → Workers y Pages → Crear → Pages → Connect to Git.
2. Elegir este repositorio y la rama `main`.
3. Configuración de build: Framework preset **None**, build command **vacío**, build output directory **/** (raíz).
4. Guardar y desplegar.
5. En Custom domains, agregar `leoguillen.com` (y `www`) si el dominio está en Cloudflare.

Los archivos deben estar en la raíz del repositorio. Si quedan en una subcarpeta, Pages devuelve 404.

## Estructura

- `index.html`: página completa.
- `styles.css`: estilos y paleta ERPLEXIA.
- `script.js`: menú, revelado, contadores, mapa de conocimiento y efectos.
- `assets/leonel-guillen.jpg`: foto de perfil.
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `_headers`: SEO y seguridad.
