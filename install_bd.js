'use strict';

const fs = require('fs');
const path = require('path');
const Anuncio = require('./models/Anuncio');


// Función para eliminar los documentos existentes de la colección
function eliminarDocumentos() {
    return Anuncio.remove(function(err, removed) {
        if (err) {
            console.log('HA HABIDO UN ERROR');
            return;
        }
        // where removed is the count of removed documents
        removed.n === 1 ? console.log(`Se ha eliminado ${removed.n} anuncio`) : console.log(`Se han eliminado ${removed.n} anuncios`);
    });
}

// Función que retorna un array de objetos del fichero
function extraerModelos(nombreFichero) {
    return new Promise(resolve => {

        const fichero = path.join(__dirname, './models/', nombreFichero + '.json');

        fs.readFile(fichero, 'utf8', (err, data) => { // esta es la opción ASINCRONA! fs.readFile(path, 'utf8' (las opciones), callback);

            if (err) {
                console.log(err);
                return;
            }

            const packageObject = JSON.parse(data);
            resolve(packageObject.anuncios);
        });

    });
}

// Función para cargar los modelos en la base de datos del servidor MongoDB
const cargarModelos = async function() {
    try {
        // Conexión de Mongoose
        const conn = await require('./lib/connectMongoose');
        console.log('Conectado a la base de datos');

        // Eliminar documentos existentes de la colección
        await eliminarDocumentos();
        console.log('Se han eliminado los documentos existentes');

        // Genera un array con todos los modelos
        const arrAnuncios = await extraerModelos('anuncios');
        //console.log(arrAnuncios);

        // Guardar documento en la base de datos
        for (const anuncio of arrAnuncios) {
            const guardarAnuncio = new Anuncio(anuncio);
            await guardarAnuncio.save();
        }
        console.log('Se ha guardado el documento en la base de datos');

        // Se desconecta de la base de datos
        conn.close(function () {
            console.log('Mongoose connection disconnected');
        });

    } catch(err) {
        console.log('No ha sido posible realizar la acción', err);
    }
    
};

// Ejecutamos la función
cargarModelos();