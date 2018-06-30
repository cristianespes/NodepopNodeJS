var express = require('express');
var router = express.Router();

const { query, validationResult } = require('express-validator/check');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  
  // Si hacemos uso de una variable local
  // res.locals.hour = '23:53';
  // Si hacemos uso de una variable global en app.js quedaría así
  res.render('index');
});

/*
// Recibir parámetros mediante GET, mediante la ruta URL
router.get('/paramenruta/:dato?', (req, res, next) => {
  console.log('req.params', req.params);
  res.send('OK, Recibido el dato ' + req.params.dato);
});
*/

/*
// Recibir parámetros mediante GET, mediante la ruta URL con expresiones regulares
router.get('/portal/:portal([0-9]+)/piso/:piso([0-9]+)/puerta/:puerta(A|B|C|D)', (req, res, next) => {
  console.log('req.params', req.params);
  res.send('OK, Recibido el dato ' + JSON.stringify(req.params));
});
// Puedo acceder al parámetro directamente => req.params.id
// Puedo ver el objeto con todos los parámetros => JSON.stringify(req.params)
*/

/*
// Recibir parámetros mediante GET, con Query String
router.get('/enquerystring', (req, res, next) => {
  console.log('req.query', req.query);
  res.send('OK' + JSON.stringify(req.query));
});
*/

/*
// Recibir parámetros mediante GET, con Query String => APLICANDO UN MODULO DE VALIDACIONES
router.get('/enquerystring', [
  query('age').isNumeric().withMessage('must be numeric')
], (req, res, next) => {
  validationResult(req).throw();
  console.log('req.query', req.query);
  //res.json({ success: true, result: 'OK' }); // Para peticiones API
  res.send('OK'); // Para peticiones HTML
});
*/

/*
// Recibir parámetros mediante POST mediante el BODY (Solo aplica para PUT y POST)
router.post('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('OK' + JSON.stringify(req.body));
});
*/

module.exports = router;
