'use strict'

var Usuario = require('../models/usuarios');
var token = require("../helpers/autentication");
var bcrypt = require("bcryptjs");

function registrarUsuario(req, resp){
    console.log("Registrando usuario");
    var parametros  = req.body;
    var salt = bcrypt.genSaltSync(10);

    var contraseña = 
    bcrypt.hashSync(parametros.contraseña, salt);


    var nuevoUsuario  = new Usuario();
    nuevoUsuario.usuario = parametros.usuario;
    nuevoUsuario.contraseña = contraseña;

    nuevoUsuario.save().then(
        (usuarioGuardado) => {
            resp.status(200).send({ usuarioCreado: usuarioGuardado });
        },
        err => {
            resp.status(500).send({
                message: "No se pudo crear, intente nuevamente"
            });
        }
    );

}

function iniciarSesion ( req, resp){
    var parametros = req.body;

    var usuarioIngresado = parametros.usuario;
    var contraseñaIngresado = parametros.password;

    Usuario.findOne({usuario: usuarioIngresado}).then(
        (usuarioEncontrado) => {
            if(usuarioEncontrado == null){
                resp.status(403).send({
                    message: "No existe usuario"
                });
            }
            else{
                if(bcrypt.compareSync(
                    contraseñaIngresado,
                     usuarioEncontrado.contraseña)){
                        resp.status(200).send({
                            message: "Login exitoso",
                            token: 
                            token.generarTokenUsuario(usuarioEncontrado)
                        });
                     }
                     else{
                        resp.status(403).send({
                            message: "Credenciales incorrectas"
                        });

                     }
            }

        },
        err=>{
            resp.status(500).send({
                message: "No se pudo validar usuario"
            });
        }
    );
}

module.exports ={
    iniciarSesion, registrarUsuario
}
