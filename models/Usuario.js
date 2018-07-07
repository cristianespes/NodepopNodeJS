'use strict';

const mongoose = require('mongoose');

// Definimos esquema
const usuarioSchema = mongoose.Schema({
    nombre: String,
    email: { type: String, unique: true }, // unique genera ya de por sí un índice único
    clave: String
});

// Indice a los campos
usuarioSchema.index({ nombre: 1, clave: 1 });

// Creación del modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;