
var express = require('express');
var cors =require('cors');
var bodyParser = require('body-parser');
// Using debug functionality
var debug = require('debug')('dos-buster');
var path = require('path');
var logger = require('morgan');
var mylogger = require('./logging.js');
var api = require('./routes/api');

//var models = require('./models/models.js');
var mongoose = require('mongoose');




mylogger.debug('booting');
var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api', api);

// error handlers







module.exports = app;


