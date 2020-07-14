import SessionModel from '../../../../server/models/session.model';
import SessionsService from '../services/sessions.service';

class SessionsController {
  async list(ctx) {
    const { professionalCode } = ctx.params;
    const conditions = !professionalCode ? {} : {_id: professionalCode};

    const data = await SessionModel.find(conditions);

    if (data === null || data === undefined) {
      ctx.status = 404;
      ctx.body = 'The requested resource was not found or is empty.';
    }
    const sessions = await SessionsService.generateListSessionsAllProfessionals(data);
    ctx.status = 201;
    ctx.body = sessions;
  }

  async create(ctx) {
    try {
      const entity = await SessionModel(ctx.request.body); // refactor for data validation
      const professionalSessions = await entity.save();

      ctx.status = 201;
      ctx.body = professionalSessions;
    } catch (err) {
      ctx.status = ctx.status;
      ctx.body = {
        message: err.message,
        status: ctx.status,
      }
    }
  }

  async update(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: {},
    };
  }

  async delete(ctx) {
    try {
      const { professionalCode } = ctx.params;

      await SessionModel.findOneAndDelete({ '_id': professionalCode });

      ctx.status = 204;
    } catch (err) {
      ctx.status = ctx.status;
      ctx.body = {
        message: err.message,
        status: ctx.status,
      };
    }
  }

  async schedule(ctx) {
    ctx.status = 200;
    ctx.body = {
      status: await SessionsService.action(),
    };
  }
}

export default new SessionsController();
