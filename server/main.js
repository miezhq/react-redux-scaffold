require('es6-promise').polyfill();
const ENVS = require('./app/constants').ENVS;
const config = require('./config');
// Get environment or set default environment to development
const express = require('express');

const ENV = process.env.NODE_ENV || ENVS.DEVELOPMENT;

const app = express();

// Set express variables
app.set('root', config.get('basePath'));
app.set('env', ENV);

require('./app/setup/views').init(app);
require('./app/setup/express').init(app);
require('./app/setup/routes').init(app);

module.exports = app;
