import SessionModel from '../../../../server/models/session.model';
import SessionsService from '../services/sessions.service';

class SessionsController {
  async list(ctx) {
    const param = [
      {
        day: 3,
        interval_hours: [
          {
            start: "8:00",
            end: "12:00"
          },
          {
            start: "14:00",
            end: "18:00"
          }
        ],
        booked_sessions: []
      }
    ];
    ctx.status = 200;
    ctx.body = {
      body: await SessionsService.mountProfessionalWeekDisponibility(param),
    };
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
      status: await SessionsService.action(),
    };
  }

  async delete(ctx) {
    try {
      const { id } = ctx.params;

      await SessionModel.findOneAndDelete({ '_id': id });

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
