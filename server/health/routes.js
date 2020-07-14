import KoaRouter from '@koa/router';

import get from './healthController';

const healthRouter = new KoaRouter();

healthRouter.get('/health', get);

export default healthRouter;
