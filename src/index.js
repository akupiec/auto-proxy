const config = require('./config');
const proxySever = require('./proxyServer')(config);
const LOGGER = require('./logger')(config);
const server = require('./server');

LOGGER.trace('All config Props: ', JSON.stringify(config));

server(proxySever, config);