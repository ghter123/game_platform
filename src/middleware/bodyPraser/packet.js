/**
 * 协议包
 */
const ByteBuffer = require('byte-buffer');
const ProtoBuf = require('protobufjs');

const root = ProtoBuf.loadSync(`${__dirname}/c2s.proto`);

class packet {
  constructor(template) {
    this.msg_type = 'c2s';
    if (template) {
      this.template = template;
      this.msg = root.lookupType(`commander.${this.msg_type}.${this.template}`);
    }
    this.pack = null;
    this.buffer = null;
  }

  setTemplate(template) {
    this.template = template;
    this.msg = root.lookupType(`commander.${this.msg_type}.${this.template}`);
  }

  create(obj) {
    this.pack = this.msg.create(obj);
  }

  toBase64(content) {
    return Buffer.from(content).toString('base64');
  }

  fromBase64(content) {
    return Buffer.from(content, 'base64').toString();
  }

  formatBuffer(buffer) {
    const bufferArray = Object.keys(buffer).map((k) => buffer[k]);
    return bufferArray;
  }

  todata(buffer) {
    return this.msg.decode(buffer);
  }

  tobuffer(obj) {
    const pack = this.msg.create(obj);
    const buff = this.msg.encode(pack).finish();
    const buffer = new ByteBuffer(this.template.length + 2 + buff.length);
    buffer.writeShort(this.template.length);
    buffer.writeString(this.template);
    buffer.write(buff);
    this.buffer = buffer;
    return buffer.buffer;
  }

  clean() {
    this.buffer = null;
  }
}

module.exports = packet;
