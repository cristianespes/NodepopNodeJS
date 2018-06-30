// ----------------- Código general de la aplicación -----------------
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); // Indica la ruta de las Views
app.set('view engine', 'ejs'); // Indica el motor de búsqueda que debe utilizar

/** Conexión y modelos de Mongoose */
require('./lib/connectMongoose');

app.use(logger('dev'));
app.use(express.json()); // En el body, si es un JSON lo parse
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Parsear cookies
app.use(express.static(path.join(__dirname, 'public')));


// ----------------- Personalización de la API -----------------

/**
 * Rutas de la API
 */
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));

// Aquí podemos definir VARIABLES GLOBALES para ser usadas en las vistas (templates)
app.locals.title = 'NodeAPI';

/**
 * Rutas de la Aplicación Web
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));


// ----------------- Tramitación de los errores -----------------

// catch 404 and forward to error handler
// Si nadie ha respondido, y esta función llega a evaluarse
app.use(function(req, res, next) {
  // Pasamos el error 404 al siguiente middlware
  next(createError(404));
});

// error handler
// Cualquier error se acaba tramitando aquí
app.use(function(err, req, res, next) {

  // En el caso de ERROR en las VALIDACIONES. Estan las devolverán en un Array
  // Proviene del fichero index.js
  // Si es una petición aplicación web, responder en HTML
  if (err.array) { // Si el objeto error tiene una propiedad Array, se ha generado algún error
    err.status = 422;
    const errInfo = err.array( { onlyFirstError: true } )[0]; // Devuelve un array y cojo la primera posición
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`; // Estamos respondiendo en HTML
  }

  // Establece el status
  res.status(err.status || 500);

  // Si es una petición al API, responder con JSON
  if (isAPI(req)) {
    res.json({ success: false, error: err.message });
    return; // Terminamos aquí la ejecución
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

// Creamos una función para comprobar si es una petición al API
function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
