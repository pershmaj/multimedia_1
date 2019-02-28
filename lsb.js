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

  arDataBin = splitBy(arDataBin.join(''))//массив с бинарными разбитыми по 2

  let DataBinLength = ('0'.repeat(dataBinaryLength - arDataBin.length.toString(2).length)) 
                          + arDataBin.length.toString(2) // бинарное количество разбиений изображения доведенное до 30 символов

  DataBinLength = splitBy(DataBinLength) //разбиваем для записи
  for(let i = 0; i < pixelsForDataLength; i++) {
    if(this.data[i].toString(2).length > 2) {
      this.data[i] = parseInt(this.data[i].toString(2).slice(0, -2) + DataBinLength[i], 2)
    } else {
      this.data[i] = parseInt(DataBinLength[i], 2)
    }
  }

  let y = 0 // iterator for data
  for(let i = pixelsForDataLength; i < arDataBin.length + pixelsForDataLength; i++) {
    if(this.data[i].toString(2).length > 2) {
      this.data[i] = parseInt(this.data[i].toString(2).slice(0, -2) + arDataBin[y++], 2)
    } else {
      this.data[i] = parseInt(arDataBin[y++], 2)
    }
  }

  this.pack().pipe(fs.createWriteStream('out.png'));
});

setTimeout(function(){
  fs.createReadStream('./out.png').pipe(new PNG({filterType: 4})).on('parsed', function() {

    let length = []
    let data = []
  
    for(let i = 0; i < pixelsForDataLength; i++) {
      length.push(this.data[i].toString(2).slice(-2))
    }
    
    length = parseInt(length.join(''), 2)

    console.log('length out = '+length)
    
    console.log('pixel count to read data'+(parseInt(length) + parseInt(pixelsForDataLength)))

    for(let i = pixelsForDataLength; i < parseInt(length) + parseInt(pixelsForDataLength); i++) {
      data.push(this.data[i].toString(2).slice(-2))
    }
    console.log(bin2String(splitBy(data.join(''), 7)))
  });
}, 2000)

app.get('/', function (req, res) {
  res.send(data)
});

app.listen(3002, function () {
  console.log('Example app listening on port 3001!')
})