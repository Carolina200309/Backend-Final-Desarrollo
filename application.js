'use strict'

var express = require("express")
var bodyParser = require("body-parser");
var routes = require('./routes/routes');

var application = express();

application.use(
    bodyParser.urlencoded(
        {extended:false}));

application.use(bodyParser.json());
application.use(routes);

module.exports = application;