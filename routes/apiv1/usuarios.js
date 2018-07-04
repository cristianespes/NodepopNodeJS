'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const localConfig = require('../../localConfig');

// Cargamos el modelo
const Usuario = require('../../models/Usuario');

/**
 * Método para iniciar sesión y obtener un token
 */
router.post('/iniciarsesion', async (req, res, next) => {

    try {
        // Recoger credenciales
        const nombre = req.body.nombre;
        const email = req.body.email;
        const clave = req.body.clave;

        // Buscar en base de datos
        const usuario = await Usuario.findOne({ email: email }).exec();

        // Si No encontramos al usuario
        if (!usuario) {
            res.json({ success: true, message: 'invalid credentials' });
            return;
        }

        // Comprobar el nombre y la clave
        if (clave !== usuario.clave || nombre !== usuario.nombre) {
            res.json({ success: true, message: 'invalid credentials' });
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


/**
 * POST /
 * Registrar un nuevo usuario
 */
router.post('/registrarse', async (req, res, next) => {
    
    try {

        // Buscar si existe en la base de datos
        const existeUsuario = await Usuario.findOne({ email: req.body.email }).exec();

        // Si encontramos al usuario
        if (existeUsuario) {
            res.json({ success: true, message: 'email already registered' });
            return;
        }

        // Si no existe en la base de datos

        // Crear un usuario en memoria
        const nuevoUsuario = new Usuario(req.body);

        // Registrar en la Base de Datos
        const usuarioGuardado = await nuevoUsuario.save();
        res.json({ success: true, result: usuarioGuardado});

    } catch (err) {
        next(err);
    }

});


module.exports = router;