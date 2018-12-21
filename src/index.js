const config = require('./config/config');
const LOGGER = require('./config/logger');
const server = require('./server');

LOGGER.trace('All config Props: ', JSON.stringify(config));

server(config);