var EventEmitter = require('events').EventEmitter;

var getResource = function(c) {
  var e  = new EventEmitter();
  process.nextTick(function() {
    var count = 0;
    e.emit('start');
    var t = setInterval(function() {
      e.emit('data', ++count);
      if(count == c) {
        e.emit('end', count);
        clearInterval(t);
      }
    },1000);
  });
  return e;
};

var r = getResource(5);

r.on('start', function() {
  console.log("Started!!");
});

r.on('data', function(d) {
  console.log("data received is : " + d);
});

r.on('end', function(d) {
  console.log("end is near!! " + d);
});


/*
var request = require('request');

var s = request('http://www.pluralsight.com'); //return the stream

s.on('data', function(data) {
  console.log("data:" + data);
});

s.on('end', function() {
  console.log("done");
});
*/
