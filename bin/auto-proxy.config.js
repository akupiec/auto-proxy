/* eslint-disable indent */

module.exports = {
    server: { //local server configuration block
        port: 8088, // [required]
        staticSource: '/public', // sever have possibility to serve local content - defines content url
        staticPath: '../assets/public', // static content will be served form this directory
        fallback: '../assets/public/index.html', // if request will not it elsewhere this file will be served
    },
    proxy: { //reverse proxy configuration block
        target: 'http://google.com', // [required] proxy target
        changeOrigin: true,
        secure: true,
        disabled: false, //Disable proxy, only already cached files will be served
    },
    proxies: [ // ... it's kind'of required block
        {
            contextPath: '/services', // [required] poxed url path to target

            cache: { //cache configuration block
                enabled: true, //save new cache files & serve them when match request
                meta: false, //TODO: store request/response meta (headers, resp code)
                             //When set to false all cached files will be served with 200 response code with minimum meta data
                hashing: true, //TODO: file names will contain crc32 hash based on query & payload request, instead of plain text
                madCache: true, //TODO: cache all request's (even 404) will be cached as success (200)
                                //Requires disabled meta storing
                filtering: { //describes what should be cached
                    //TODO
                },
            },
        },
    ],
    mock: './mockDir', //directory for cached files
    log: 'ALL', // logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF]
};