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
    const { professionalCode, day, hour, customer } = ctx.request.body;

    if (!professionalCode || !day || !hour || !customer) {
      ctx.status = 400;
      ctx.body = 'Some parameters were not sent.';
    }

    const data = await SessionModel.findOne({ '_id': professionalCode });

    if (data === null || data === undefined) {
      ctx.status = 404;
      ctx.body = 'The requested resource was not found or is empty.';
    }

    try {
      const available = await SessionsService.verifySlotAvailability(data, day, hour);
      const date_day = await SessionsService.getDateByDay(day);

      if (available !== null && date_day !== null) {
        await SessionModel.findOneAndUpdate({'_id': professionalCode, 'availability._id': available}, {
          $push: {
            'availability.$.booked_sessions': {
              customer,
              date: date_day.toString(),
              hour
            }
          }
        },
        {upsert: true });

        ctx.status = 201;
        ctx.body = 'Success';
      } else {
        ctx.status = 400;
        ctx.body = 'Slot not available';
      }
    } catch (err) {
      ctx.status = ctx.status;
      ctx.body = {
        message: err.message,
        status: ctx.status,
      };
    }
  }
}

export default new SessionsController();
