const stream = require('stream');

module.exports = class StreamWriter extends stream.Writable {
    constructor(...args) {
        super(...args);
        this.writable = true;
        this.bytes = 0;
        this.raw = [];
    }

    write(buf) {
        if(buf instanceof Buffer) {
            this.raw.push(buf);
            this.bytes += buf.length;
        } else {
            const chunk = Buffer.from(buf);
            this.write(chunk);
        }
    }

    end(buf) {
        if (buf) this.write(buf);

        this.writable = false;
        this.body = Buffer.concat(this.raw);
        super.end(...arguments);
    }
};
