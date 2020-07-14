import log4js from 'log4js';

const log = log4js.getLogger('request');
export default async (context, next) => {
  log.debug(`Received request for endpoint: ${context.method} ${context.url}`);
  const start = Date.now();
  await next();
  log.debug(
    `Finished request for endpoint: HTTPStatus ${context.status} ${
      context.method
    } ${context.url} in ${Date.now() - start}ms`
  );
};
