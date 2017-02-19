var fs = require('fs');
var filename = 'app.js';

fs.watch( filename, function(event, filename) {
  console.log(event + " occured on file " + filename);
});
