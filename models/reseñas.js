'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReseñaSchema = new Schema({
    nombreRestaurante: String,
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    calificacion: Number,
    comentario: String, 
    fecha: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Reseña', ReseñaSchema);

