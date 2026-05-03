let log = console.log;

const http = require('http');

const server = http.createServer((req, res) => {
    log("Petición recibida en:", req.url);
    res.setHeader("content-type", "text/html");
    res.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="utf-8">
            <title>Servidor Node</title>
        </head>
        <body>
            <h1>Hola mundo desde Node</h1>
            <p>Servidor corriendo correctamente</p>
        </body>
        </html>
    `);
    res.end();
});

server.listen(4141, () => {
    log("Mi servidor está vivo corriendo en el puerto 4141");
});
