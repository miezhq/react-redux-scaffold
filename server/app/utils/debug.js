const debug = require('debug');

const MAIN_NAMESPACE = 'app';

module.exports = (namespace) => debug(`${MAIN_NAMESPACE}:${namespace}`);
