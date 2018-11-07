var http = require('http'),
    net = require('net'),
    httpProxy = require('http-proxy'),
    url = require('url'),
    util = require('util');

var proxy = httpProxy.createServer();

var server = http.createServer(function (req, res) {
  console.log('Receiving reverse proxy request for:' + req.url);
  proxy.web(req, res, {target: req.url, secure: false});
}).listen(3000);

server.on('connect', function (req, socket) {
  console.log('Receiving reverse proxy request for:' + req.url);

  var serverUrl = url.parse('https://' + req.url);

  var srvSocket = net.connect(serverUrl.port, serverUrl.hostname, function() {
    socket.write('HTTP/1.1 200 Connection Established\r\n' +
    'Proxy-agent: Node-Proxy\r\n' +
    '\r\n');
    srvSocket.pipe(socket);
    socket.pipe(srvSocket);
  });
});

// Test with:
// curl -vv -x http://127.0.0.1:8213 https://www.google.com
// curl -vv -x http://127.0.0.1:8213 http://www.google.com