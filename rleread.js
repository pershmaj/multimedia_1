var express = require('express');
var app = express();
var fs = require('fs'), PNG = require('pngjs').PNG;


fs.createReadStream('./image/black.png').pipe(new PNG({filterType: 4})).on('parsed', function() {
  
    let data = this.data
    
    fs.writeFile('rleOut', str.join(' '), () => {})
});


app.get('/', function (req, res) {
  res.send(data)
});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!')
})