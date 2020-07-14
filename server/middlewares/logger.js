import log4js from 'log4js';

const log = log4js.getLogger('log-request');

export default async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  log.info(`${ctx.origin} ${ctx.method} ${ctx.url} - ${rt}`);
};
