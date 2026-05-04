const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Middleware general
app.use((request, response, next) => {
    console.log('Petición recibida en:', request.url);
    next();
});

// Ruta principal
app.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send('Bienvenido al catálogo de libros. Ve a /libros o /info/acerca');
});

// Módulos de rutas
const rutasLibros = require('./routes/libros.routes');
const rutasInfo = require('./routes/info.routes');

app.use('/libros', rutasLibros);
app.use('/info', rutasInfo);

// Middleware 404
app.use((request, response, next) => {
    response.status(404);
    response.send('¡Página no encontrada (404)!');
});

app.listen(3000);
console.log('Servidor corriendo en http://localhost:3000');
