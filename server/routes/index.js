const express = require('express');
const router = express.Router();

// Controladores
const homeController = require('../controllers/homeController');
const nosotrosController = require('../controllers/nosotrosController');
const viajesController = require('../controllers/viajesController');
const testimonialesController = require('../controllers/testimonialesController');

// configuramos ruta principal
// use responde a todos los verbos de htpp
module.exports = function() {
    router.get('/', homeController.consultasHomepage);
    // configuramos ruta perfil
    router.get('/nosotros', nosotrosController.infoNosotros);
    router.get('/viajes', viajesController.mostrarViajes);
    router.get('/viajes/:id', viajesController.mostrarViaje);

    router.get('/testimoniales', testimonialesController.mostrarTestmoniales);
    // cuando se llena el formulario
    router.post('/testimoniales', testimonialesController.agregarTestimonial);
    
    return router;
}