const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'secreto de laboratorio sesiones cookies',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax'
    }
}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const mensaje = req.session.mensaje || '';
    req.session.mensaje = '';

    res.render('index', {
        nombreCookie: req.cookies.nombre || '',
        nombreSesion: req.session.nombreSesion || '',
        visitas: req.session.visitas || 0,
        mensaje: mensaje
    });
});

app.post('/guardar-nombre', (req, res) => {
    const nombre = req.body.nombre || 'Invitado';

    res.cookie('nombre', nombre, {
        maxAge: 1000 * 60 * 10,
        httpOnly: true,
        sameSite: 'lax'
    });

    req.session.nombreSesion = nombre;
    req.session.mensaje = 'Nombre guardado en cookie y sesión.';
    res.redirect('/');
});

app.get('/visita', (req, res) => {
    if (!req.session.visitas) {
        req.session.visitas = 0;
    }

    req.session.visitas++;
    req.session.mensaje = 'Visita agregada a la sesión.';
    res.redirect('/');
});

app.get('/test_cookie', (req, res) => {
    const valor = req.cookies.nombre;
    res.type('text/plain');
    res.send(valor || 'No hay cookie llamada nombre');
});

app.get('/test_session', (req, res) => {
    const valor = req.session.nombreSesion;
    res.type('text/plain');
    res.send(valor || 'No hay variable de sesión llamada nombreSesion');
});

app.get('/logout', (req, res) => {
    res.clearCookie('nombre');

    req.session.destroy(() => {
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
