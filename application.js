'use strict'

var express = require("express")
var routes = require('./routes/routes');
const cors = require('cors');
const {json} = require("express");

const application = express();

application.use(cors());
application.use(json());
application.use(routes);

module.exports = application;