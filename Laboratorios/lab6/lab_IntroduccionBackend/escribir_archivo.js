let log = console.log;

// fs es el módulo para manipular el sistema de archivos
const fs = require("fs");

// Función que recibe un string y lo escribe en un archivo de texto
function escribirArchivo(texto) {
    fs.writeFileSync("salida.txt", texto);
    log("Archivo creado con el contenido:", texto);
}

// Prueba
escribirArchivo("Hola, este texto fue escrito desde Node.js");
