const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

fs.mkdirSync('./private', { recursive: true });

const app = express();
const port = 3000;
const log = console.log;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const controller = require("./index.controller.js")
app.post('/upload_file', controller.upload_file);

app.post('/upload_file_private', controller.upload_file_private);

app.listen(port, () => {
    // server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});