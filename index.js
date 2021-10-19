const { WebSocket } = require('ws');
const bodyParser = require('./middleware/bodyPraser/body-parser');
const Application = require('./lib/application');
const Routers = require('./middleware/router/router');

const app = new Application();
app.listen({ port: 8080 }, () => console.log('listening'));

const fn1 = async (ctx, next) => {
  console.log('fn1 中间件接收到消息：', ctx.req.body.toString());
  ctx.res.body = 'hello';
  await next();
  console.log('fn1');
};

const fn2 = async (ctx, next) => {
  console.log('fn2 中间件接收到消息：', ctx.req.body.toString());
  ctx.res.body = 'hello';
  await next();
  console.log('fn2');
};

const fn3 = async (ctx, next) => {
  console.log('fn3 中间件接收到消息：', ctx.req.body.toString());
  ctx.res.body = 'hello';
  await next();
  console.log('fn3');
};

app.use(fn1);
app.use(fn2);
app.use(fn3);
app.use(bodyParser);
app.use(Routers);

const wsClient = new WebSocket('ws://localhost:8080');

wsClient.on('message', (msg) => console.log('客户端接收到消息：', msg.toString()));
wsClient.on('open', () => {
  wsClient.send('hello world');
});
