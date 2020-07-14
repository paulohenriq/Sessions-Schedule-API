import log4js from 'log4js';

const log = log4js.getLogger('error');

export default async (context, next) => {
  const start = Date.now();
  try {
    await next();
  } catch (err) {
    log.error(
      `Failed request for endpoint: HTTPStatus ${context.status} ${
        context.method
      } ${context.url} in ${Date.now() - start}ms`,
      err.message
    );
    throw err;
  }
};
