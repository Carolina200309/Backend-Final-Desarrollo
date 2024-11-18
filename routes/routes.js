'use strict';

var express = require('express');
var reseñasController = require('../controllers/reseñas');
var token = require('../helpers/autentication');
const usuarios = require('../models/usuarios');
var authenticationController = require("../controllers/autentication");

var routes = express.Router();


routes.post('/api/resenas',
    token.validarToken, 
    reseñasController.crearReseña
);

routes.put('/api/resenas/:id', 
    token.validarToken, 
    reseñasController.modificarReseña
);

routes.delete('/api/resenas/:id',
    token.validarToken, 
    reseñasController.eliminarReseña
);

routes.get('/api/resenas',
    token.validarToken,
    reseñasController.consultarReseñas
);

routes.post('/api/usuario',
    authenticationController.registrarUsuario
);

routes.post('/api/login',
    authenticationController.iniciarSesion
);

module.exports = routes;
