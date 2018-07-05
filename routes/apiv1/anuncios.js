'use strict';

const express = require('express');
const router = express.Router();

// Cargamos el modelo
const Anuncio = require('../../models/Anuncio');

// Cargamos el módulo de autentificación
const jwtAuth = require('../../lib/jwtAuth');

const i18n = require('../../lib/i18n');

/**
 * GET /
 * Recupera una lista de anuncios
 */
router.get('/', jwtAuth(), async (req, res, next) => {
    try {

        // El usuario es:
        console.log(`El usuario autenticado es ${req.user_id}`);

        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const precio = req.query.precio;
        const tag = req.query.tag;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        // Crea un filtro vacío
        const filter = {};

        // Solo añadir el filtro cuando se solicite
        if (nombre) {
            filter.nombre = new RegExp('^' + nombre, "i");
        }
        if (venta) {
            filter.venta = venta;
        }
        if (precio) {
            //console.log(precio);
            // Si no incluye guión
            if (!precio.includes('-')) {
                filter.precio = parseInt(precio);
            }
            // Si el guión está al principio
            if (precio.indexOf('-') === 0) {
                // console.log('El guión está al principio');
                filter.precio = { '$lte': precio.replace('-', '') };
            }
            // Si el guión está al final
            if (precio.indexOf('-') === (precio.length -1)) {
                // console.log('El guión está al final');
                filter.precio = { '$gte': precio.replace('-', '') };
            }
            // Si contiene guión en medio
            if (precio.includes('-') && (precio.indexOf('-') !== 0) && (precio.indexOf('-') !== (precio.length -1))) {
                //console.log('Es el último de los casos');
                const precioMenor = precio.substr(0, precio.indexOf('-'));
                //console.log('Precio menor' + precioMenor);
                const precioMayor = precio.substr(precio.indexOf('-') + 1, precio.length - 1);
                //console.log('Precio mayor' + precioMayor);
                filter.precio = { '$gte': precioMenor, '$lte': precioMayor };
            }
        }
        if (tag) {
            //console.log(`tag: ${tag}`);
            filter.tags = { '$in': [ tag ] };
        }

        const anuncios = await Anuncio.list(filter, skip, limit, fields, sort); // await espera a resolver la promesa y devuelve el resultado
        res.json({ success: true, result: anuncios });
    } catch(err) {
        next(err);
    }
});

/**
 * GET /
 * Muestra el listado de tags
 */
router.get('/tags', async (req, res, next) => {
    try {
        const etiquetas = await Anuncio.showTags();
        res.json({ success: true, result: etiquetas });
    } catch(err) {
        next(err);
    }
});

/**
 * POST /
 * Crear un anuncio
 */
router.post('/', async (req, res, next) => {
    
    try {
        // Crear un anuncio en memoria
        const anuncio = new Anuncio(req.body);

        // Filtro para no insertar una etiqueta que no sea válida
        if ((anuncio.tags != 'mobile') && (anuncio.tags != 'work') && (anuncio.tags != 'lifestyle') && (anuncio.tags != 'motor')) {
            anuncio.tags = undefined;
        }

        // Guardar en la Base de Datos => Versión async / await
        const anuncioGuardado = await anuncio.save();
        res.json({ success: true, result: anuncioGuardado});
    } catch (err) {
        next(err);
    }

});


/**
 * PUT /
 * Modificar un anuncio
 */
router.put('/:id', async (req, res, next) => {
    try {
        // Los datos que recibe el middleware
        const _id = req.params.id;
        const data = req.body;

        // Busca el anuncio y lo actualiza
        const anuncioModificado = await Anuncio.findOneAndUpdate({ _id: _id }, data, { new: true }).exec();

        // Una vez modificado el anuncio, respondemos
        res.json({ success: true, result: anuncioModificado});

    } catch(err) {
        next(err);
    }
});

/**
 * DELETE /
 * Eliminar un anuncio
 */
router.delete('/:id', async (req, res, next) => {
    try {
        // Si se ha insertado por parte del usuario algún idioma
        if (req.query.lang) {
            i18n.setLocale(req.query.lang);
        }
        
        console.log('El texto deberia ser:', i18n.__('Hello i18n'));
        const _id = req.params.id;

        // Busca el anuncio y lo elimina
        const anuncioBorrado = await Anuncio.remove({ _id: _id }).exec();

        // Una vez borrado el anuncio, respondemos
        res.json({ success: true, result: anuncioBorrado });

    } catch(err) {
        next(err);
    }
});


module.exports = router;