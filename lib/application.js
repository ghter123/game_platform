/**
 * ws application
 */

const WSServer = require('ws').WebSocketServer;
const Emitter = require('events');
const compose = require('koa-compose');
const Context = require('./context');
const logger = require('../utils/logConfig')('default');

class Application extends Emitter {
  constructor() {
    super();
    this.middleware = [];
  }

  listen(options, callback) {
    const wss = new WSServer(options, callback);

    wss.on('connection', (ws) => {
      ws.on('message', async (data, isBinary) => {
        const fn = compose(this.middleware);
        const ctx = new Context(this, ws, data, isBinary);
        const onerror = (err) => ctx.onerror(err);
        try {
          await fn(ctx);
          return this.respond(ctx);
        } catch (err) {
          return onerror(err);
        }
      });
    });

    wss.on('error', (err) => {
      logger.error(err.message);
    });

    return wss;
  }

  respond(ctx) {
    if (ctx.body !== null) {
      ctx.socket.send(ctx.body);
    }
  }

  use(fn) {
    if (typeof fn !== 'function') throw new Error('middleware 必须是一个函数');
    this.middleware.push(fn);
    return this;
  }
}

module.exports = Application;
