const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 3000;

const { routes } = require('./proxyconfig.js');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => path.split('/').slice(2).join('/');
        })
    );
}

app.listen(port, () => {
    console.log(`Proxy listening on port ${port}`);
});