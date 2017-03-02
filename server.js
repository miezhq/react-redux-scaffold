const debug = require('./server/app/utils/debug')('server');
const config = require('./server/config');
const app = require("./server/main");

const http = require('http');
const server = http.Server(app);

const PORT = config.get('port');
const HOST = config.get('host');
const ENV = app.get('env');

server.listen(
  PORT,
  HOST,
  () => {
    debug(`   listening at : ${HOST}:${PORT}`);
    debug(`   environment: ${ENV.toLowerCase()}`);
    debug(`   base path: ${app.get('root')}`);
  }
);
