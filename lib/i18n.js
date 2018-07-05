var i18n = require('i18n');

i18n.configure({
  locales:['es', 'en'],
  directory: __dirname + '/locales',
  //defaultLocale: 'es',
  //queryParameter: 'lang',
  cookie: 'lang'
});

module.exports = i18n;