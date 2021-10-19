const Redis = require('ioredis');

const redisClient = new Redis();

redisClient.on('error', (error) => {
  console.error(error);
});

redisClient.on('ready', () => {
  console.log('redis ready!');
});

redisClient.on('end', () => {
  console.log('redis end');
});

module.exports = async (ctx, next) => {
  ctx.redis = redisClient;
  await next();
};
