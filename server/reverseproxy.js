const express = require('express');
const morgan = require ('morgan');
const proxy = require('http-proxy-middleware');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();

const { routes } = require('./reverseproxyconfig.json');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

for (route of routes) {
    app.use(route.route,
        proxy({
            target: route.address,
            pathRewrite: (path, req) => path.split('/').slice(2).join('/')
        })
    );
}

app.listen(port, () => {
    console.log(`Proxy is listening on port ${port}`);
});