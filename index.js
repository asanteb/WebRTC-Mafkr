var express = require('express')
var app = express()

  , port = process.env.PORT || 8080

app
  .set('port', port)
  .use( express.static('public') )

var server = app.listen(port, function () {
  console.log('Example app listening on port ' + port);
})
