require('dotenv').config();

const express = require('express');
const path    = require('path');
const pool    = require('./util/database.js');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const gameRoutes = require('./routes/game.routes.js');
app.use('/games', gameRoutes);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hola Mundo - Lab17BDSupabase');
});

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' });
});

app.get('/test_db', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM games LIMIT 20');
        res.status(200).json(rows);
    } catch (e) {
        console.log(e);
        res.status(500).json({ msg: 'Error al consultar la base de datos' });
    }
});

app.listen(3000, () => {
    console.log('Servidor en http://localhost:3000');
});
