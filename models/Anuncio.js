'use strict';

const mongoose = require('mongoose');

// Definimos esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}, { collection: 'anuncios' });

// Creación del modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;