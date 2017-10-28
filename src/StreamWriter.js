const stream = require('stream');

module.exports = class StreamWriter extends stream.Writable {
    constructor(...args) {
        super(...args);
        this.writable = true;
        this.bytes = 0;
        this.raw = [];
    }

    write(buf) {
        this.raw.push(buf);
        this.bytes += buf.length;
    }

    end(buf) {
        if (buf) this.write(buf);

        this.writable = false;
        this.body = Buffer.concat(this.raw);
        this.emit('finish');
    }
};
