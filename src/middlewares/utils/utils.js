const zlib = require('zlib');
const mime = require('mime-types');
const glob = require('glob');

function encodeBuffer(res, buffer) {
    const encoding = res.getHeader('content-encoding');
    if(encoding && encoding.toLowerCase() === 'gzip') {
        return zlib.gunzipSync(buffer); //gzip checker needed
    }
    return buffer;
}

function getExtension(res) {
    const contentType = res.getHeader('content-type');
    // const charset = mime.charset(contentType);
    return '.' + mime.extension(contentType);
}

const cachedEvilFile = (filePath) => {
    const evilFilePath = filePath.replace(/#.*/, '#666');
    const possibleTable = glob.sync(evilFilePath + '.*');
    return possibleTable.length ? possibleTable[0] : undefined;
};

const cacheDefaultFile = (filePath) => {
    const evilFilePath = filePath.replace(/#.*/, '');
    const possibleTable = glob.sync(evilFilePath + '.*');
    return possibleTable.length ? possibleTable[0] : undefined;
};

const cacheNormalFile = (filePath) => {
    let possibleTable = glob.sync(filePath + '.*');
    return possibleTable.length ? possibleTable[0] : undefined;
};

module.exports.getExtension = getExtension;
module.exports.encodeBuffer = encodeBuffer;
module.exports.cacheNormalFile = cacheNormalFile;
module.exports.cachedEvilFile = cachedEvilFile;
module.exports.cacheDefaultFile = cacheDefaultFile;
