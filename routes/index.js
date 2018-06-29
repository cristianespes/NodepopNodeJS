var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
// Recibir parámetros mediante GET, mediante la URL
router.get('/paramenruta/:dato?', (req, res, next) => {
  console.log('req.params', req.params);
  res.send('OK, Recibido el dato ' + req.params.dato);
});
*/

/*
// Recibir parámetros mediante GET, con expresiones regulares
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

// Recibir parámetros mediante POST mediante el BODY (Solo aplica para PUT y POST)
router.post('/enelbody', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('OK' + JSON.stringify(req.body));
});

module.exports = router;
