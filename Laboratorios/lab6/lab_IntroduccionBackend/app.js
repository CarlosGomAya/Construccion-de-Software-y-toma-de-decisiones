let log = console.log;

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    log("Petición recibida en:", req.url);
    res.setHeader("content-type", "text/html");
    // Lee la página HTML del archivo y la manda como respuesta
    const pagina = fs.readFileSync("pagina.html");
    res.write(pagina);
    res.end();
});

server.listen(4141, () => {
    log("Servidor corriendo en el puerto 4141");
});
