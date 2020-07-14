import cors from '@koa/cors';
import KoaRouter from '@koa/router';
import Koa from 'koa';
import KoaBody from 'koa-body';
import { oas } from 'koa-oas3';
import jsonError from 'koa-json-error';
import log4js from 'log4js';

import versions from './versions';
import health from './health/routes';
import requestLog from './middlewares/request-log/request-log';
import errorHandler from './middlewares/error-handler/error-handler';

import './config/database';

const log = log4js.getLogger('app');

const init = async () => {
  log.info('Configuring app...');
  const app = new Koa();
  app.use(requestLog);
  app.use(cors());
  app.use(KoaBody());
  app.use(
    jsonError({
      postFormat: (_e, obj) =>
        process.env.NODE_ENV === 'development'
          ? obj
          : {
              code: obj.code,
              status: obj.status || 500,
              message: obj.message || 'Unknown error',
            },
    })
  );
  app.use(errorHandler);

  const appRouter = new KoaRouter();
  appRouter.get('/', async (ctx) => {
    ctx.body = {
      state: 'Server is running...',
    };
  });

  app.use(appRouter.routes());
  app.use(health.routes(), health.allowedMethods());

  versions.forEach((config) => {
    /* app.use(
      oas({
        spec: config.swaggerConfig,
        endpoint: `${config.basePath}/openai.json`,
        uiEndpoint: `${config.basePath}/swagger`,
        validateResponse: true,
      })
    ); */

    const router = new KoaRouter({
      prefix: config.basePath,
    });
    config.routes(router);
    app.use(router.routes());
  });

  log.info('App configured!');
  return app;
};

export default init;
