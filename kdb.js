var express = require('express');
var app = express();
var fs = require('fs'), PNG = require('pngjs').PNG;
var jpeg = require('jpeg-js')
var lsbtools = require('lsbtools')
var images = require('images')

var countLsb = 2 //количество НЗБ 1 2 3
var dataBinaryLength = 30 //количество
var pixelsForDataLength = dataBinaryLength/countLsb

string2Bin = (str) => {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    result.push(str.charCodeAt(i).toString(2));
  }
  return result;
}

bin2String = (array) => {
  let result = "";
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(parseInt(array[i], 2));
  }
  return result;
}

splitBy = (str, numb = 2) => {
  let arr = []
  for(var i = 0; i < str.length/numb; i++ ){
    arr.push(str.slice(numb*i, numb*i+numb))
  }
  return arr
}


fs.createReadStream('./image/bla.png').pipe(new PNG({filterType: 4})).on('parsed', function() {
  
  let data = fs.readFileSync('data', "utf8")

  let arDataBin = string2Bin(data)
  
  for(let i = 0; i < arDataBin.length; i++){
    if(arDataBin[i].length<7){
      arDataBin[i] = '0'.repeat(7 - arDataBin[i].length) + arDataBin[i]
    }
  } 

  console.log('binary data input = '+arDataBin)

  arDataBin = splitBy(arDataBin.join(''), 1)//массив с бинарными разбитыми  по 1

  for(let i = 0; i < arDataBin.length; i++) {

  }

  this.pack().pipe(fs.createWriteStream('out.png'));
});

// setTimeout(function(){
//   fs.createReadStream('./out.png').pipe(new PNG({filterType: 4})).on('parsed', function() {

//     let length = []
//     let data = []
  
//     for(let i = 0; i < pixelsForDataLength; i++) {
//       length.push(this.data[i].toString(2).slice(-2))
//     }
    
//     length = parseInt(length.join(''), 2)

//     console.log('length out = '+length)
    
//     console.log('pixel count to read data'+(parseInt(length) + parseInt(pixelsForDataLength)))

//     for(let i = pixelsForDataLength; i < parseInt(length) + parseInt(pixelsForDataLength); i++) {
//       data.push(this.data[i].toString(2).slice(-2))
//     }
//     console.log(bin2String(splitBy(data.join(''), 7)))
//   });
// }, 2000)

app.get('/', function (req, res) {
  res.send(data)
});

app.listen(3002, function () {
  console.log('Example app listening on port 3001!')
})