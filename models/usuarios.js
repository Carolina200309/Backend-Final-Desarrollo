'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    usuario: String,
    contraseña: String,
});

module.exports = 
    mongoose.model('usuarios', UsuarioSchema);