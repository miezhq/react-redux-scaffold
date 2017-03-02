const confee = require('confee');
const path = require('path');
const ENVS = require('../app/constants').ENVS;

const ENV = process.env.NODE_ENV || ENVS.DEVELOPMENT;

confee.init({
  srcFolder: path.resolve(__dirname),
  type: 'js',
});

const config = confee.load(ENV);

module.exports = config;
