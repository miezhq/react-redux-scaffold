const config = require('./server/config');
const envs = require('./server/app/constants').ENVS;

const ENV = config.get('env') || envs.DEVELOPMENT;

const webpackConfig = require(`./webpack.config.${ENV}`);

module.exports = webpackConfig;
