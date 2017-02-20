var http = require('http');
var socket = require('socket.io');
var fs = require('fs');

var app = http.createServer(function(req, res) { //handler does nothing but regardless of any url it returns index.html, it doesn't even looks at the request (req)
  fs.readFile(__dirname + '/index.html', function(err, data) {
    if(err) {
    res.writeHead(500);
    return res.end("Error loading the index.html");
  }
    else {
      res.writeHead(200);
      res.end(data);
    }
  });
}).listen(8000);; //instead of anonymous callback we have a named function

var io = socket.listen(app);
io.sockets.on('connection', function(socket) {
  setInterval(function() {
    var timeStamp = Date.now();
    console.log('Emitted ' + timeStamp);
    socket.emit('timer', timeStamp);
  }, 2000);
socket.on('submit', function(data) {
   console.log('Submitted ' + data);
 });
});

console.log("Server is running!!");
