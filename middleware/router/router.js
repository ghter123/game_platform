const routerMap = new Map();

module.exports.register = (type, fn) => {
  if (typeof type !== 'string') throw new TypeError('router endingpoit type must be string!');
  if (typeof fn !== 'function') throw new TypeError('router endingpoit must be fn!');
  routerMap.set(type, fn);
  return routerMap;
};

module.exports.router = async (ctx) => {
  if (!routerMap.has(ctx.req.type)) {
    ctx.res.body = `${ctx.req.type || 'msgType 为空'},服务端不能找到！`;
    ctx.res.event = 's2c_notice';
    return;
  }
  const fn = routerMap.get(ctx.req.type);
  let result = fn();
  if (result instanceof 'promise') {
    result = await result;
  }
  ctx.res.body = result;
};
