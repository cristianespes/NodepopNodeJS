'use strict';

const mongoose = require('mongoose');

// Definimos esquema
const anuncioSchema = mongoose.Schema({
    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
});

// Definimos los tipos de etiquetas
const tags = ['lifestyle', 'mobile', 'motor', 'work'];

// Indice a los campos
anuncioSchema.index({ nombre: 1 });
anuncioSchema.index({ venta: 1 });
anuncioSchema.index({ precio: -1 });
anuncioSchema.index({ foto: 1 });
anuncioSchema.index({ tags:1 });

// Esto crea un solo índice con todos esos campos, cuando se hagan búsquedas por venta no servirá
//anuncioSchema.index({ nombre: 1, venta: 1, precio: -1, foto: 1, tags: 1});

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

// Método estático que devuelve un array con los tipos de etiquetas
anuncioSchema.statics.showTags = function() {
    return tags;
};


// Creación del modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;