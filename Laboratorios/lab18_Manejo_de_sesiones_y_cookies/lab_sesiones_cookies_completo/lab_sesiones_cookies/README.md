# Laboratorio: Manejo de sesiones y cookies

Aplicación básica en Express para practicar cookies y sesiones.

## Instalación

```bash
npm install
npm start
```

Después abre:

```bash
http://localhost:3000
```

## Qué hace

- Guarda un nombre en una cookie llamada `nombre`.
- Guarda el mismo nombre en una variable de sesión llamada `nombreSesion`.
- Cuenta visitas con una variable de sesión llamada `visitas`.
- Permite revisar la cookie en `/test_cookie`.
- Permite revisar la sesión en `/test_session`.
- Permite cerrar sesión y borrar la cookie en `/logout`.

## Archivos principales

- `app.js`: configuración de Express, cookies, sesiones y rutas.
- `views/index.ejs`: vista principal.
- `public/css/styles.css`: estilos sencillos.
