var express = require('express')
var app = express()

app.use( express.static('public') )

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})

// Peer Server
var peer = require('peer').ExpressPeerServer

var options = {debug: true, port: 3000, path: '/server'}

app.use('/server', peer(server, options))
