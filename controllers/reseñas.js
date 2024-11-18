'use strict'

const reseñas = require('../models/reseñas');
var Reseña = require('../models/reseñas');
var Usuario = require('../models/usuarios');
const mongoose = require('mongoose');


function crearReseña(req, resp) {
    // Verificar si el usuario está autenticado
    var usuarioId = req.userId;

    if (usuarioId) {
        var reseñaRecibida = req.body;

        var nuevaReseña = new Reseña({
            nombreRestaurante: reseñaRecibida.nombreRestaurante,
            usuario: usuarioId, 
            calificacion: reseñaRecibida.calificacion,
            comentario: reseñaRecibida.comentario,
            fecha: reseñaRecibida.fecha 
        });

        nuevaReseña.save().then(
            (reseñaGuardada) => {
                resp.status(200).send({ reseñaCreada: reseñaGuardada });
            },
            (err) => {
                resp.status(500).send({
                    message: 'No se pudo crear la reseña, intente nuevamente',
                    error: err
                });
            }
        );
    } else {
        resp.status(401).send({
            message: 'No está autorizado. Debe iniciar sesión para crear reseñas.'
        });
    }
}

function modificarReseña(req, resp) {
    const usuarioId = req.userId;  
    const reseñaId = req.params.id;  

   
    Reseña.findById(reseñaId).then(reseñaEncontrada => {
        if (!reseñaEncontrada) {
            return resp.status(404).send({
                message: 'Reseña no encontrada'
            });
        }

        if (reseñaEncontrada.usuario.toString() !== usuarioId) {
            
            return resp.status(403).send({
                message: 'No tienes permiso para modificar esta reseña'
            });
        }

        reseñaEncontrada.calificacion = req.body.calificacion || reseñaEncontrada.calificacion;
        reseñaEncontrada.comentario = req.body.comentario || reseñaEncontrada.comentario;

        reseñaEncontrada.save().then(reseñaGuardada => {
            resp.status(200).send({ reseñaModificada: reseñaGuardada });
        }).catch(err => {
            resp.status(500).send({
                message: 'Error al actualizar la reseña'
            });
        });
    }).catch(err => {
        resp.status(500).send({
            message: 'Error al buscar la reseña'
        });
    });
}

function eliminarReseña(req, resp) {
    const usuarioId = req.userId;  
    const reseñaId = req.params.id; 

    // Verificar si el ID es válido
    if (!mongoose.Types.ObjectId.isValid(reseñaId)) {
        return resp.status(400).send({
            message: 'ID de reseña inválido'
        });
    }

    // Buscar y eliminar la reseña 
    Reseña.findOneAndDelete({ 
        _id: reseñaId, 
        usuario: usuarioId 
    }).then(reseñaEliminada => {
        console.log("Resultado de findOneAndDelete:", reseñaEliminada);

        if (!reseñaEliminada) {
            return resp.status(404).send({
                message: 'Reseña no encontrada o no tienes permiso para eliminarla'
            });
        }

        resp.status(200).send({
            message: 'Reseña eliminada con éxito',
            reseñaEliminada: reseñaEliminada
        });
    }).catch(err => {
        console.error("Error completo al eliminar:", err);
        resp.status(500).send({
            message: 'Error al eliminar la reseña',
            error: err.toString()
        });
    });
}

function consultarReseñas(req, resp) {
    Reseña.find({}).then(
        (reseñas) => {
            resp.status(200).send({ reseñas: reseñas });
        },
        (err) => {
            resp.status(500).send({
                message: 'No se pudieron obtener las reseñas. Intente nuevamente.',
                error: err
            });
        }
    );
}


module.exports = {
    crearReseña,
    modificarReseña,
    eliminarReseña,
    consultarReseñas
} 
