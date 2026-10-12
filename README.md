# leoguillen-web

Sitio personal de Leonel Guillén Hernández. HTML, CSS y JavaScript estáticos. Cloudflare Pages publica los archivos tal cual (sin build en Cloudflare).

## Despliegue en Cloudflare Pages

1. Cloudflare → Workers y Pages → Crear → Pages → Connect to Git.
2. Elegir este repositorio y la rama `main`.
3. Configuración de build: Framework preset **None**, build command **vacío**, build output directory **/** (raíz).
4. Guardar y desplegar.
5. En Custom domains, agregar el dominio elegido (`leoguillen.com` o un subdominio).
6. Opcional: en el proyecto de Pages → Metrics → activar **Web Analytics** (sin cookies). La CSP de `_headers` ya lo permite.

Los archivos deben estar en la raíz del repositorio. Si quedan en una subcarpeta, Pages devuelve 404.

## Al editar estilos o scripts

Se edita `styles.css` o `script.js` y luego se ejecuta:

```
./build.sh
```

Genera `styles.min.css` y `script.min.js` y actualiza el `?v=` en `index.html` para que el navegador descargue la versión nueva (esos archivos se cachean un año).

## Estructura

- `index.html`: página completa.
- `styles.css` / `styles.min.css`: estilos fuente y minificados (paleta y tipografía del sitio Lovable).
- `script.js` / `script.min.js`: menú, revelado, contadores, mapa de conocimiento y efectos.
- `fonts/`: Inter y Playfair Display (variables, subconjunto latino, licencia OFL incluida).
- `assets/`: foto de perfil en AVIF, WebP y JPG (330, 460 y 660 px) y la original para redes sociales.
- `favicon.svg`, `robots.txt`, `sitemap.xml`, `_headers`: SEO, caché y seguridad.
