# Auto Proxy

Auto caching reverse proxy, with partial static server -
highly useful for testing UI applications when backed is slow or temporary unavailable.

## Installation Steps

Currently I do not have any plans for npm release, or any kind long term support
(At least before finishing version 1.0.0).
Moreover you're propably looking for something else.

1. check npm if there is anything better, if not - then you may proceed. (if there is let me known ^_^ )
1. manually download *.tgz file release.
1. install package by npm/yarn ex: `npm install ./path/auto-proxy-0.0.1.tgz`
1. create configuration file (yes it's required to create one by hand)
1. run by `auto-proxy -c config.json`

## Configuration

```js
{
  "server": { //local server configuration block
    "port": 8080 // [required]
    "staticSource": "/public", // sever have possibility to serve local content - defines content url
    "staticPath": "../assets/public", // static content will be served form this directory
    "fallback": "index.html" // if request will not it elsewhere this file will be served
  },
  "proxy": { //reverse proxy configuration block
    "target": "http://google.com", // [required] proxy target
    "changeOrigin": true,
    "secure": true
  },
  "proxies": [ // ... it's kind'of required block
    {
      "contextPath": "/services", // [required] poxed url path to target
      "cache": true, //TODO: save new cache files
      "meta": false, // TODO: store meta to all cached files not only for problematic ones
      "useCache": true, //TODO: if request is already cached, mock will be served
      "madCache": true, // TODO: all request even 404 will be cached as success
    }
  ]
}

```

## CLI

Everything is described in `auto-proxy --help`
