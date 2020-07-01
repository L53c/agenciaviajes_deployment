// importar express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const routes = require('./routes');

const configs = require('./config');

const app = express();

// Validar si estamos en desarrollo o en producción
const config = configs[app.get('env')];
// Creamos la variable para el sitio web
app.locals.titulo = config.nombresitio;

// habilitar pug
app.set('view engine', 'pug');

// Añadir las vistas
app.set('views', path.join(__dirname, './views'));

// cargar una carpeta estatica llamada public
app.use(express.static('public'));

// Muestra el año actual y genera la ruta
app.use((req, res, next) => {
    // crear una nueva fecha
    const fecha = new Date();
    fecha.getFullYear();
    res.locals.fechaActual = fecha.getFullYear();
    res.locals.ruta = req.path;
    return next();
});
// ejecutamos el bodyparser
app.use(bodyParser.urlencoded({extended: true}));

// Utilizamos use porque vamos a cargar el router y cada uno tiene su verbo correspondiente
app.use('/', routes());

// Puerto y host para la app, 0.0.0.0 no es una dirección válida pero herokula detecta y le asigna una
const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;

// configuramos puerto
app.listen(port, host, ( () => console.log(`El servidor está funcionando en el puerto ${port} y en el host ${host}`)));