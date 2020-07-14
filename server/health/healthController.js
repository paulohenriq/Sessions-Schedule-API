const get = async (ctx) => {
  ctx.body = { health: true };
  return ctx.body;
};

export default get;
