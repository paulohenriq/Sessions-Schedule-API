import log4js from 'log4js';

const log = log4js.getLogger('sessions-schedule-api');

const logRequest = async (context, next) => {
  await next();
  log.info(
    `Finished request: ${context.method} ${context.url} ${JSON.stringify(
      context.request.body
    )} with Response: ${context.status} ${JSON.stringify(
      context.response.body
    )}`
  );
};

export default logRequest;
