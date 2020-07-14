// import SessionsModel from '../../../../server/models/sessions.model';
import SessionsService from '../services/sessions.service';

class SessionsController {
  async list(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: await SessionsService.action(),
    };
  }

  async create(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: await SessionsService.action(),
    };
  }

  async update(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: await SessionsService.action(),
    };
  }

  async delete(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: await SessionsService.action(),
    };
  }

  async schedule(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: await SessionsService.action(),
    };
  }
}

export default new SessionsController();
