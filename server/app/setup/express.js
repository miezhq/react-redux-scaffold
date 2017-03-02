const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const serveStatic = require('serve-static');
const express = require('express');
const webpack = require('webpack'); // eslint-disable-line
const cookieParser = require('cookie-parser');
const ENVS = require('../constants');
const webpackDevMiddleware = require('../middlewares/webpack-dev');
const webpackHMRMiddleware = require('../middlewares/webpack-hmr');
const config = require('../../config');
const webpackConfig = require('../../../webpack.config');

function initExpress(app) {
  const root = app.get('root');

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.disable('x-powered-by');

  if (app.get('env') === ENVS.ENVS.DEVELOPMENT) {
    const compiler = webpack(webpackConfig);
    // Enable webpack-dev and webpack-hot middleware
    const { publicPath } = webpackConfig.output;

    app.use(webpackDevMiddleware(compiler, publicPath));

    app.use(webpackHMRMiddleware(compiler));
    app.use(express.static(path.join(root, '../src/static')));
  } else if (app.get('env') !== ENVS.ENVS.PRODUCTION && config.get('server.serveStatic')) {
    app.use(serveStatic(path.join(root, 'doc')));
  }
}

module.exports.init = initExpress;
