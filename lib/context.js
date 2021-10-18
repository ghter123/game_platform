class Context {
  constructor(app, socket, data, isBinary) {
    this.app = app;
    this.socket = socket;
    this.body = data;
    this.isBinary = isBinary;
  }

  onerror(err) {
    if (err == null) return;

    // delegate
    this.app.emit('error', err, this);
    this.ws.send('');
  }
}

module.exports = Context;
