import KoaRouter from '@koa/router';

import SessionsController from '../controllers/sessions.controller';

const sessionsRouters = new KoaRouter();

sessionsRouters.get('/', SessionsController.list);
sessionsRouters.get('/:professionalCode', SessionsController.list);
sessionsRouters.post('/', SessionsController.create);
sessionsRouters.put('/:id', SessionsController.update);
sessionsRouters.delete('/:professionalCode', SessionsController.delete);
sessionsRouters.post('/schedule', SessionsController.schedule);

export default sessionsRouters;
