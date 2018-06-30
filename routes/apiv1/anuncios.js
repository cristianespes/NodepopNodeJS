'use strict';

const express = require('express');
const router = express.Router();

// Cargamos el modelo
const Anuncio = require('../../models/Anuncio');

/**
 * GET /
 * Recupera una lista de anuncios
 */
router.get('/', (req, res, next) => {
    Anuncio.find({}).exec((err, anuncios) => {
        // Primero controlamos el error
        if (err) {
            next(err);
            return;
        }
        // Repuesta en JSON
        res.json({ success: true, result: anuncios });
    });
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


module.exports = router;