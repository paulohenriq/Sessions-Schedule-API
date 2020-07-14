// import SessionsModel from '../../../../server/models/sessions.model';
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
