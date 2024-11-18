'use strict'
var application = require('./application');
var mongoose = require('mongoose');
mongoose.connect(
    "mongodb://127.0.0.1:27017/finaldesarrollo")
    .then(
        () => {
            console.log("Conexion exitosa");
            application.listen(9898, function(){
                console.log("Aplicacion inciada");
            })

        },
        err => {
            console.log("Conexion con BBDD fallida.");
        }
    );