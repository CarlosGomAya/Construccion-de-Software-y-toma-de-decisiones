const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const archivoLibros = path.resolve(__dirname, './../libros.txt');

// GET /libros -> lista los libros guardados
router.get('/', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    if (fs.existsSync(archivoLibros)) {
        const datos = fs.readFileSync(archivoLibros, 'utf8');
        response.send('Libros guardados:\n\n' + datos);
    } else {
        response.send('Aún no hay libros guardados.');
    }
});

// GET /libros/agregar -> muestra el formulario
router.get('/agregar', (request, response) => {
    response.setHeader('Content-Type', 'text/html');
    response.send(`
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="utf-8"><title>Agregar libro</title></head>
        <body>
            <h1>Agregar nuevo libro</h1>
            <form method="POST" action="/libros/agregar">
                <input type="text" name="titulo" placeholder="Título" required><br><br>
                <input type="text" name="autor" placeholder="Autor" required><br><br>
                <input type="submit" value="Guardar">
            </form>
        </body>
        </html>
    `);
});

// POST /libros/agregar -> guarda el libro en libros.txt
router.post('/agregar', (request, response) => {
    const titulo = request.body.titulo;
    const autor = request.body.autor;

    const linea = `Título: ${titulo} | Autor: ${autor}\n`;
    fs.appendFileSync(archivoLibros, linea);

    console.log('Libro guardado:', linea);
    response.send(`¡Libro guardado! "${titulo}" de ${autor}. <a href="/libros">Ver lista</a>`);
});

module.exports = router;
