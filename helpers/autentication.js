'use strict'

const { response } = require("express");
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "kghgasdyRARWas!.";

function generarTokenUsuario(usuario){
    var payload = {
        sub: usuario._id,
        usuario: usuario.usuario, 
        iat: moment().unix(),
        exp: moment().add(1, 'hours').unix()
    }
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep) {
    try {
        var tokenEnviadoPorUsuario = req.headers.authorization;
        var tokenLimpio = tokenEnviadoPorUsuario.replace('Bearer ', '');
        var payload = jwt.decode(tokenLimpio, secret);

        // Verificación del token decodificado
        console.log("Payload del token: ", payload);

        req.userId = payload.sub;
        req.userRol = payload.rol;  

        nextStep();  
    } catch (ex) {
        resp.status(403).send({
            message: 'Token no válido'
        });
    }
}

module.exports = {
    generarTokenUsuario, validarToken
}
