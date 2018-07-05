var i18n = require('i18n');

i18n.configure({
  locales:['es', 'en'],
  directory: __dirname + '/locales',
  //defaultLocale: 'es',
  queryParameter: 'lang',
  cookie: 'lang'
});

module.exports = i18n;

module.exports.checkLanguage = (req) => {
  
  // Primero por la preferencia del usuario mediante un query string
  if (req.query.lang) {
    i18n.setLocale(req.query.lang);
    console.log('query string', req.query.lang);
    return;
  }

  // Segundo por la cookie
  if (i18n.cookie) {
    i18n.setLocale(i18n.cookie);
    console.log('Cookie', i18n.cookie);
    return;
  }

  // Tercera por el lenguaje que se indica en la cabecera
  if (req.headers['accept-language']) {
    i18n.setLocale(req.headers['accept-language']);
    console.log('Accept Language', req.headers['accept-language']);
    return;
  }

  return;
};