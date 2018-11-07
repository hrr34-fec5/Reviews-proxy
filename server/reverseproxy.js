const express = require('express');
const httpProxy = require('http-proxy');
const proxy = require('http-proxy-middleware');
const path = require('path');

const apiProxy = httpProxy.createProxyServer();
const port = process.env.PORT || 3000;
const app = express();

const vince =   'http://localhost:1337',
      sean =    'http://localhost:3001',
      pat =     'http://localhost:8080',
      stephen = 'http://localhost:3030';

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// app.all('/app1/*', (req, res) => {
//     console.log('redirecting to reviews');
//     apiProxy.web(req, res, {target: vince});
// });

// app.all('/app2/*', (req, res) => {
//     console.log('redirecting to calendar');
//     apiProxy.web(req, res, {target: stephen});
// });

// app.all('/app3/*', (req, res) => {
//     console.log('redirecting to photostream');
//     apiProxy.web(req, res, {target: pat});
// });

// app.all('/app4/*', (req, res) => {
//     console.log('redirecting to info');
//     apiProxy.web(req, res, {target: sean});
// });

app.get('/listing/:id', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.listen(port, () => console.log(`Proxy is listening on port ${port}`));