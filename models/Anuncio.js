'use strict';

const mongoose = require('mongoose');

/**
 * OJO! HAY QUE AÑADIR INDICE A TODOS ESTOS PARÁMETROS!!!!!
 */

// Definimos esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
}, { collection: 'anuncios' });

// Método estático (aplica al modelo, no las instancias)
anuncioSchema.statics.list = function(filter, skip, limit, fields, sort) {
    // Crea la query sin ejecutar y se le añade lo necesario
    const query = Anuncio.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    // query.select(fields + ' -_id'); Así decido yo si no deben ver algún campo
    query.sort(sort);

    // Ejecuta la query y devuelve una promesa
    return query.exec();
};


// Creación del modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;