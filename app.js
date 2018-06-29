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

app.use(logger('dev'));
app.use(express.json()); // En el body, si es un JSON lo parse
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // Parsear cookies
app.use(express.static(path.join(__dirname, 'public')));


// ----------------- Personalización de la API -----------------

// Rutas de mi Aplicación Web
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
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
