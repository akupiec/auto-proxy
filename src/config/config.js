const deepAssign = require('deep-assign');
const argv = require('./argv');
const path = require('path');
const LOGGER = require('./logger');

function loadConfigFile() {
    const defaultConfig = require('../../bin/mad-proxy.config');
    defaultConfig.proxies = [];
    let configFileData;
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
    const config = deepAssign(defaultConfig, configFileData, argv);
    return config;
}

function extendWithDefaultValues(config) {
    if (config.proxies) {
        config.proxies = config.proxies.map((proxyConf) => {
            proxyConf.cache = proxyConf.cache || {enabled: false};
            return proxyConf;
        });
    }
    return config;
}

function validateConfig(config) {
    let isValid = true;
    if (!config.proxies) {
        LOGGER.error('Invalid config file. Missing \'config.proxies\' array');
        isValid = false;
    }

    config.proxies.map((proxyConf, idx) => {
        if (!proxyConf.target) {
            LOGGER.error(`Invalid config file. Missing 'config.proxies[${idx}].target' array`);
            isValid = false;
        }
        if (!proxyConf.path) {
            LOGGER.error(`Invalid config file. Missing 'config.proxies[${idx}].path' array`);
            proxyConf.path = '';
            isValid = false;
        }
        if (!proxyConf.path.match(/^\/.*/)) {
            LOGGER.error(`Invalid config file. 'config.proxies[${idx}].path=${proxyConf.path}' have to START with slash '\\'`);
            isValid = false;
        }
        if (proxyConf.path.match(/.+\/$|\*$/)) {
            LOGGER.error(`Invalid config file. 'config.proxies[${idx}].path=${proxyConf.path}' shouldn't END with slash '\\' or asterisk '*', mad-proxy will add one for you.`);
            isValid = false;
        }
    });
    return isValid;
}

let config = loadConfigFile();
config = extendWithDefaultValues(config);
if(!validateConfig(config)) {
    throw Error('Invalid config!');
}

LOGGER.logLvl = config.log;
module.exports = config;
