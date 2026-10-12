#!/usr/bin/env bash
# Minifica CSS y JS y versiona las referencias en index.html con un hash del contenido.
# Ejecutar después de editar styles.css o script.js:  ./build.sh
set -euo pipefail
cd "$(dirname "$0")"
npx -y lightningcss-cli@1 --minify --targets '>= 0.5%' styles.css -o styles.min.css
npx -y terser@5 script.js --compress --mangle -o script.min.js
CSS_V=$(sha256sum styles.min.css | cut -c1-10)
JS_V=$(sha256sum script.min.js | cut -c1-10)
sed -i -E "s#styles\.min\.css\?v=[A-Za-z0-9]+#styles.min.css?v=${CSS_V}#; s#script\.min\.js\?v=[A-Za-z0-9]+#script.min.js?v=${JS_V}#" index.html
echo "OK  styles.min.css?v=${CSS_V}  script.min.js?v=${JS_V}"
