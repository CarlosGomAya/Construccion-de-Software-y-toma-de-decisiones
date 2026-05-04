require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
    secret: process.env.SESSION_SECRET || 'cambia-esto-en-desarrollo',
    resave: false,
    saveUninitialized: false
}));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.get('/', (req, res) => {
    res.send('Hola Mundo');
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/usuarios/login');
    });
});

const rutasUsuarios = require('./routes/usuarios.routes.js');
app.use('/usuarios', rutasUsuarios);

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
