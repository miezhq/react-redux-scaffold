const WebpackDevMiddleware = require('webpack-dev-middleware');
const debug = require('../utils/debug')('server:app:webpack-dev');

module.exports = (compiler, publicPath) => {
  debug('Enable webpack dev middleware.');

  return WebpackDevMiddleware(compiler, {
    publicPath,
    quiet: false,
    noInfo: false,
    lazy: false,
    hot: true,
    compress: true,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  });
};
