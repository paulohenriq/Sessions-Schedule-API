export default async (ctx, next) => {
  ctx.success = (obj) => {
    return {
      success: true,
      obj,
    };
  };

  await next();
};
