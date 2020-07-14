import KoaRouter from '@koa/router';

import SessionsController from '../controllers/sessions.controller';

const sessionsRouters = new KoaRouter();

sessionsRouters.get('/', SessionsController.list);
sessionsRouters.get('/:professional', SessionsController.list);
sessionsRouters.post('/', SessionsController.create);
sessionsRouters.put('/:id', SessionsController.update);
sessionsRouters.delete('/:id', SessionsController.delete);
sessionsRouters.post('/schedule', SessionsController.schedule);

export default sessionsRouters;
