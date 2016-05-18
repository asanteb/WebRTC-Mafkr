var http = require('http'); var server = http.createServer(function(req, res) {
  res.end('Hello from NodeJS!\n');
  console.log('Someone visited our web server!');
})
server.listen(80, '0.0.0.0');
console.log("NodeJS web server running on 0.0.0.0:8081");
