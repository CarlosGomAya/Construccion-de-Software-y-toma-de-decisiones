const express = require('express');
const router = express.Router();

// GET /info/acerca
router.get('/acerca', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send('Catálogo de libros - Lab 11 Express. Hecho por Carlitos.');
});

// GET /info/contacto
router.get('/contacto', (request, response) => {
    response.setHeader('Content-Type', 'text/plain');
    response.send('Contacto: carlitos@ejemplo.com');
});

module.exports = router;
