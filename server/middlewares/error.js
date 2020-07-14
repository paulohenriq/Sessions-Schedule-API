import log4js from 'log4js';

import messages from '../utils/error-messages.json';

const log = log4js.getLogger('error');

export default async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    log.error(err);
    const response = messages[err.message] || messages.DEFAULT;
    response.body.details = `${err.message} - ${JSON.stringify(err)}`;

    Object.assign(ctx, response);
  }
};
