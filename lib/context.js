class Context {
  constructor(app, socket, data, isBinary) {
    this.app = app;
    this.socket = socket;
    this.req = {
      body: data,
    };
    this.res = {
      body: null,
    };
    this.isBinary = isBinary;
  }

  onerror(err) {
    if (err == null) return;

    // delegate
    this.app.emit('error', err, this);
    this.ws.send('');
  }

  end(...args) {
    this.res = { ...args };
  }
}

module.exports = Context;
