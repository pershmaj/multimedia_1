var express = require('express');
var app = express();
var fs = require('fs'), PNG = require('pngjs').PNG;
var jpeg = require('jpeg-js')
var lsbtools = require('lsbtools')
var images = require('images')
const orle = require('orle');


fs.createReadStream('./image/black.png').pipe(new PNG({filterType: 4})).on('parsed', function() {
  
    // let bla = new Int16Array(this.data)
    let data = this.data
    console.log(data)
    let arrEl = [], count = 1, el = null, arr = [data[0]]
    for(let i = 1; i < data.length; i++) {
        if(data[i-1] === data[i]) {
            
            arr.push(data[i])

        } else {

            arrEl.push(arr)
            arr = []
        }
    }
    console.log(arrEl)

  
});


app.get('/', function (req, res) {
  res.send(data)
});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!')
})