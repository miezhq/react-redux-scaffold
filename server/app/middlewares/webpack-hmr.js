const WebpackHotMiddleware = require('webpack-hot-middleware');
const debug = require('../utils/debug')('server:app:webpack-hmr');

module.exports = (compiler, opts) => {
  debug('Enable Webpack Hot Module Replacement (HMR).');

  return WebpackHotMiddleware(compiler, opts);
};
