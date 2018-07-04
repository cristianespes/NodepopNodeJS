'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');

// Cargamos el modelo
const Usuario = require('../../models/Usuario');

router.post('/login', async (req, res, next) => {

    try {
        // Recoger credenciales
        const nombre = req.body.nombre;
        const email = req.body.email;
        const clave = req.body.clave;

        // Buscar en base de datos
        const usuario = await Usuario.findOne({ email: email }).exec();
        console.log(usuario);

        // Si No encontramos al usuario
        if (!usuario) {
            res.json({ success: true, message: 'invalid credentials MEG1' });
            return;
        }

        // Comprobar el nombre y la clave
        if (clave !== usuario.clave || nombre !== usuario.nombre) {
            res.json({ success: true, message: 'invalid credentials MEG2' });
            return;
        }

        // Crear Token (JWT)
        jwt.sign({ user_id: usuario._id }, localConfig.jwt.secret, { expiresIn: localConfig.jwt.expiresIn }, (err, token) => {
            if (err) {
                next(err);
            }
            // Respondemos al cliente dándole el Token (JWT)
            res.json({ success: true, token });
        }); // versión asíncrona, añadimos lo que debe contener la token, indicamos una clave que solo conocerá el servidor, 

    } catch(err) {
        next(err);
    }

});

module.exports = router;