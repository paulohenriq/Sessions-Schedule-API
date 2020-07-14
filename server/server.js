import http from 'http';
import log4js from 'log4js';
import app from './app';

log4js.configure({
  appenders: { out: { type: 'stdout' } },
  categories: {
    default: { appenders: ['out'], level: process.env.LOG_LEVEL || 'info' },
  },
});

const log = log4js.getLogger('index');

require('../configs');

const PORT = process.env.APP_PORT;
const { NODE_ENV } = process.env;

app().then(
  (server) => {
    // Starting both http & https servers
    const httpServer = http.createServer(server.callback());

    httpServer.listen(PORT, () => {
      log.info(`Server listening on ${PORT} in ${NODE_ENV} environment`);
    });
  },
  (err) => {
    log.error('Error while starting up server', err);
    throw err;
  }
);
