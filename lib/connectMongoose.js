// Módulo que conecta Mongoose a la base de datos de MongoDB

'use strict';

// Cargamos la librería Mongoose
const mongoose = require('mongoose');
// Hacemos la conexión
const conn = mongoose.connection;

// Al conectar, si ocurre algún error, cuando reciba el evento error
conn.on('error', err => {
    console.log('Error al conectar con MongoDB', err);
});

// Si conecta correctamente, cuando reciba el evento open
conn.once('open', () => {
    console.log('Conectado a MongoDB en', conn.name);
});

// Indicamos donde conectarse
mongoose.connect('mongodb://localhost/nodepop');

module.exports = conn;