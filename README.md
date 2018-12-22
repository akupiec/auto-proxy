# Mad Proxy

[![Travis](https://img.shields.io/travis/akupiec/mad-proxy.svg)](https://travis-ci.org/akupiec/mad-proxy)
[![license](https://img.shields.io/github/license/akupiec/mad-proxy.svg)]()


Lightweight fast *reverse proxy*, with cashing functionality. Basic idea in mad proxy is to simplify and speed up development process, when quick mocking is required.

Mad Proxy will cache all defined requests in plain unmodified files, allowing easy modifications to responses.

Cached files can be easily created by hand whenever needed allowing to mock non existing api.

**Made for development purposes only !**
**WARNING**  This app is in development snapshot and probably will never be released.

## Installation Steps

Everything before 1.0.0 should be considered as alpha version.
Breaking changes can happen in minor updates, check [CHANGELOG](CHANGELOG.md) for details.

1. install package by npm/yarn ex: `npm install mad-proxy`

1. create configuration file (details in [Configuration section](#configuration-api))

1. run by `mad-proxy -c config.js` 

## Configuration API

Configuration file is neccessery mad-proxy can be use .js or .json file.

Example file can be found here: [default configuration file](bin/mad-proxy.config.js)

```
{
  server: {}
  proxy: {},
  proxies: [{}, {}, {}],
  mock: './mocksDir',
  log: 'DEBUG', 
}
```
- server: mad-proxy server configuration block
- proxy: reverse proxy configuration block
- proxies: array of proxy destination targets, can be configured as remote server, local directory or single local file
- mock: root directory where cached files will be saved
- log: level of console logging, possible options [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF] 

### Server
```
server: {
  port:  8088
}
```
- port: used by mad-proxy reverse proxy server

### Proxy
```
proxy: { 
  changeOrigin:  true,
  secure:  true,
  disabled:  false, 
}, 
```
- disabled: setting this property to false will prevent sending request, cashed files still will be served normally
 
for more details and options check reference [http-proxy](https://github.com/nodejitsu/node-http-proxy#options)

### Proxie - reverse proxy
```
proxies: [{
  path: '/services',
  target: 'http://google.com',
  cache: { 
    enabled: true,
  },
}]
```
 - path: [required] proxed url path to target
 - target: [required] proxy target. This mean all request done to http://localhost:8088/services/\*, will be delegated to http://google.com/services/\*
 -  cache.enabled: when true all responses will be served from cache if available, otherwise created if missing.

### Proxie - local directory
```
proxies: [{
  path: '/public',
  target:  '../assets/public'
}]
```
 - target: relative path to local directory

### Proxie - local file
```
proxies: [{
  path: '/',
  target:  './other_public/index.html'
}]
```
 - target: relative path to single local file

## CLI

All commands are described in build in help `mad-proxy --help`.

```

General:
--config, -c Path to the config file, accepts js|json. All cli options can be override by configuration file. [string]
--mock, -m destination path where mocks will be stored


Local Server:
--server.port, --port local server port [number]
--server.fallback File served by default when nothing else fits ex. local index.html [string]


Proxy Server:
--proxy.target, --target proxy destination serer url [string]
--proxy.secure, --secure
--proxy.changeOrigin Proxy changes origin of requests
--proxy.disabled Disable proxy, only already cached files will be served.


Options:
--log logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF] [string]
-v, --version Show version number [boolean]
-h, --help Show help [boolean]

```

## Save cache rules

All requests will be saved based on fallowing rule:

```
╔════════════╦═══════════════════════════╦═════════╦══════════════════════╦═══════════╦═══════╗
║  mockDir   ║    proxy contextPath      ║  method ║       full url       ║   hash    ║  ext  ║
╠════════════╬═══════════════════════════╬═════════╬══════════════════════╬═══════════╬═══════╣
║ ./mocksDir ║ /rnc-webservices_services ║ / GET / ║ system_configuration ║ #824ac3d0 ║ .json ║
╚════════════╩═══════════════════════════╩═════════╩══════════════════════╩═══════════╩═══════╝

ex. ./mocksDir/rnc-webservices_services/GET/system_configuration#824ac3d0.json
```

Where:
* mocksDir - root directory based on configuration
* proxy contextPath - directory based on configuration proxies.path
* method - another directory
* full_url - file name composed of renaming request url where '/' was replaced with '_'
* hash - generated crc code, based on query and payload request
* extension - based on response content-type header

## Read cache rules

Upon request cached response will be served when available according to [Save cache rules](#Save-cache-rules)
Only one matching file will be used for each request, and will be picked in fallowing order:

1.  _Evil Files_ - files containing hash equal `#666`
ex. `./mocksDir/rnc-webservices_services/GET/system_configuration#666.json`

2.  _Normal Files_ - files containing hash matching payload request
ex. `./mocksDir/rnc-webservices_services/GET/system_configuration#824ac3d0.json`

3.  _Default Files_ - files without hash
ex. `./mocksDir/rnc-`enter code here`webservices_services/GET/system_configuration.json`
