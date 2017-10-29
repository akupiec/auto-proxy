module.exports = {
    server: { //local server configuration block
        port: 8088, // [required]
        staticSource: '/public', // sever have possibility to serve local content - defines content url
        staticPath: '../assets/public', // static content will be served form this directory
        fallback: 'index.html', // if request will not it elsewhere this file will be served //TODO change to path
    },
    proxy: { //reverse proxy configuration block
        target: 'http://google.com', // [required] proxy target
        changeOrigin: true,
        secure: true,
        disabled: false, //TODO: Disable proxy, only already cached files will be served
    },
    proxies: [ // ... it's kind'of required block
        {
            contextPath: '/services', // [required] poxed url path to target
            cache: { //cache configuration block
                enabled: true, //TODO: save new cache files
                meta: false, //TODO: store request/response meta (headers, resp code)
                hashing: true, //TODO: cached file name will contains hash based on query & payload request, instead of plain text
                madCache: true, //TODO: cache all request even 404 will be cached as success
                filtering: { //describes what should be cached
                    //TODO
                },
            },
        },
    ],
    mock: './mockDir', //directory for cached files
    log: 'ALL', // logging level [ALL, DEBUG, INFO, WARN, ERROR, FATAL, OFF]
};