# webhook-test

## Para empezar

1. Crear un archivo `/config.json` a partir del archivo `/config.sample.json`,
y llenar con los datos apropiados.

2. Proveer certificado y clave privada válidos en los archivos indicados
en el `/config.json`

3. Crear app de Facebook y colocar el ID en la rutina de inicialización
del SDK en `/public/auth.html:67`

4. Instalar dependencias con `npm install`

4. Correr con `npm start`

## Funcionamiento

### Autorización

Para obtener un access token de página, acceder a `https://host:puerto/auth.html`,
iniciar sesión con Facebook y seleccionar la página a la que se desea suscribir.
Éste proceso instalará la app en la página seleccionada.

### Pruebas

Enviar eventos de prueba desde el dashboard de la app en developers.facebook.com

## Otros

- Los archivos `/server.js`, `/package.json` y `/public/auth.html` no pasan de las
150 líneas de código efectivas (LLOC) entre los tres, así que debería estar bien
dentro de los parámetros de la prueba :D
- `/public/auth.html` usa el JS SDK de Facebook, VueJS y Axios desde sus respectivos CDN