import KoaRouter from '@koa/router';

import LogRequest from '../middlewares/logRequest/logRequest';

import sessionsRoutes from './sessions.routes';

const routers = new KoaRouter();

routers.use(LogRequest);

routers.use(
  '/sessions',
  sessionsRoutes.routes(),
  sessionsRoutes.allowedMethods()
);

export default routers;
