'use strict';

const express = require('express');
const router = express.Router();

// Cargamos el modelo
const Anuncio = require('../../models/Anuncio');

/**
 * GET /
 * Recupera una lista de anuncios
 */
router.get('/', async (req, res, next) => {
    try {

        const nombre = req.query.nombre;
        const venta = req.query.venta;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        // Crea un filtro vacío
        const filter = {};

        // Solo añadir el filtro cuando se solicite
        if (nombre) {
            filter.nombre = nombre;
        }
        if (venta) {
            filter.venta = venta;
        }

        const anuncios = await Anuncio.list(filter, skip, limit, fields, sort); // await espera a resolver la promesa y devuelve el resultado
        res.json({ success: true, result: anuncios });

        /*
        Anuncio.find({}).exec((err, anuncios) => {
            // Primero controlamos el error
            if (err) {
                next(err);
                return;
            }
            // Repuesta en JSON
            res.json({ success: true, result: anuncios });
        });
        */
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
        const anuncio = new Anuncio({});

        /*
        // Guardar en la Base de Datos => Versión Callback
        anuncio.save((err, anuncioGuardado) => {
            // Primero controlamos el error
            if (err) {
                next(err);
                return;
            }
            res.json({ success: true, result: anuncioGuardado});
        });
        */

        /*
        // Guardar en la Base de Datos => Versión Promesa
        anuncio.save().then(anuncioGuardado => {
            res.json({ success: true, result: anuncioGuardado});
        }).catch(err => {
            next(err);
            return;
        });
        */
        // Guardar en la Base de Datos => Versión async / await
        const anuncioGuardado = await anuncio.save();
        res.json({ success: true, result: anuncioGuardado});
    } catch (err) {
        next(err);
    }

});

/**
 * PUT /
 * Crear un anuncio
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
/*
router.delete('/:id', (req, res, next) => {
    const _id = req.params.id;

    Anuncio.remove({ _id: _id }, (err, anuncioBorrado) => {
        if (err) {
            next(err);
            return;
        }
        res.json({ success: true, result: anuncioBorrado});
    });
});
*/
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        // Busca el anuncio y lo elimina
        const anuncioBorrado = await Anuncio.remove({ _id: _id }).exec();

        // Una vez borrado el anuncio, respondemos
        res.json({ success: true, result: anuncioBorrado});

    } catch(err) {
        next(err);
    }
});


module.exports = router;