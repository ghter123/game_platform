const ByteBuffer = require('byte-buffer');
const Packet = require('./packet');

function formatBuffer(buffer) {
  const bufferArray = Object.keys(buffer).map((k) => buffer[k]);
  return bufferArray;
}

module.exports = async (ctx, next) => {
  if (ctx.isBinary) {
    const packet = new Packet();
    const arrbuffer = formatBuffer(ctx.req.body);
    let buffer = new ByteBuffer(arrbuffer);
    const headlen = buffer.readShort();
    const msgtype = buffer.readString(headlen);
    packet.setTemplate(msgtype);
    // eslint-disable-next-line no-underscore-dangle
    buffer = buffer.slice(buffer._index, buffer.byteLength);
    const pdata = packet.todata(buffer.toArray());
    ctx.req.type = msgtype;
    ctx.req.body = pdata;
    buffer = null;
    ctx.isBinary = false;
  }

  await next();

  if (typeof ctx.res.event === 'string') {
    const pack = new Packet();
    pack.setTemplate(ctx.res.event);
    const buffer = pack.tobuffer(ctx.res.body);
    ctx.res.body = buffer;
    pack.clean();
  }
};
