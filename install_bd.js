'use strict';

const fs = require('fs');
const path = require('path');
const Anuncio = require('./models/Anuncio');
const Usuario = require('./models/Usuario');
const crypto = require('crypto');

// Función para eliminar los documentos existentes de la colección
function eliminarDocumento(documento) {
    return documento.remove(function(err, removed) {
        if (err) {
            console.log('No ha sido posible eliminar los documentos:', err);
            return;
        }
        // where removed is the count of removed documents
        removed.n === 1 ? console.log(`Se ha eliminado ${removed.n} usuario`) : console.log(`Se han eliminado ${removed.n} usuarios`);
    });
}

// Función que retorna un array de objetos del fichero
function extraerModelos(nombreFichero) {
    return new Promise(resolve => {

        const fichero = path.join(__dirname, './models/', nombreFichero + '.json');

        fs.readFile(fichero, 'utf8', (err, data) => { // esta es la opción ASINCRONA! fs.readFile(path, 'utf8' (las opciones), callback);

            if (err) {
                console.log('No ha sido posible extraer los modelos', err);
                return;
            }

            const packageObject = JSON.parse(data);
            resolve(packageObject.documentos);
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
        await eliminarDocumento(Anuncio);
        await eliminarDocumento(Usuario);
        console.log('Se han eliminado los documentos existentes');

        // Genera un array con todos los modelos
        const arrAnuncios = await extraerModelos('anuncios');
        // Guardar documento en la base de datos
        for (const anuncio of arrAnuncios) {
            const guardarAnuncio = new Anuncio(anuncio);
            await guardarAnuncio.save();
        }

        // Genera un array con todos los modelos
        const arrUsuarios = await extraerModelos('usuarios');
        // Guardar documento en la base de datos
        for (const usuario of arrUsuarios) {
            let guardarUsuario = new Usuario(usuario);
            guardarUsuario.clave = crypto.createHash('sha256').update(guardarUsuario.clave).digest('base64');
            await guardarUsuario.save();
        }
        console.log('Se han guardado los documentos en la base de datos');

        // Se desconecta de la base de datos
        conn.close(function () {
            console.log('Mongoose connection disconnected');
        });

    } catch(err) {
        console.log('No ha sido posible cargar a los usuarios en la base de datos. Error:', err);
    }
    
};

// Ejecutamos la función
cargarModelos();