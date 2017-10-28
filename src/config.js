const deepAssign = require('deep-assign');
const argv = require('./argv');
const path = require('path');
const LOGGER = require('./logger')(argv);

let configFileData = {};
if (argv.config) {
    let fileName;
    try {
        fileName = path.normalize(process.cwd() + '/' + argv.config);
        configFileData = require(fileName);
    } catch (e) {
        module.exports = argv;
        LOGGER.fatal(`No config file ${fileName} was found, this will cause severe errors!!.`);
    }
}
const config = deepAssign({}, argv, configFileData);
config.server.path = path.normalize(process.cwd() + '/' + argv.server.path);

module.exports = config;