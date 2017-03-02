const path = require('path');
const ROOT = path.resolve(path.join(__dirname, '..'));

module.exports = {
  basePath: ROOT,
  baseUrl: '/',
  name: 'App name',
  port: 3000,
  host: '127.0.0.1',
  server: {
    serveStatic: false,
  },
  api: {
    endpoint: ''
  }
};
