'use strict';

const jwt = require('jsonwebtoken');
const localConfig = require('../localConfig');

// Exporta función que devuelve un middleware para comprobar JWT
module.exports = function() {
    return (req, res, next) => {
        // Recoge el token de la petición
        const token = req.body.token || req.query.token || req.get('x-access-token');

        // Si no hay token, responder 'No autorizado'
        if (!token) {
            const err = new Error('No token provided');
            err.status = 401;
            next(err);
            return;
        }

        // Verificado el token, permite pasar al siguiente middleware
        jwt.verify(token, localConfig.jwt.secret, (err,  decoded) => {
            if (err) {
                err.status = 401;
                next(err);
                return;
            }
            // Le pasamos al siguiente middleware el usuario anotandolo en el req
            req.user_id = decoded.user_id;
            next(); // Dejo pasar la petición, se ha comprobado la token correctamente
        });
    };
};

