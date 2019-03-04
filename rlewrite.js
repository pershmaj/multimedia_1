var express = require('express');
var app = express();
var fs = require('fs'), PNG = require('pngjs').PNG;


fs.createReadStream('./image/black.png').pipe(new PNG({filterType: 4})).on('parsed', function() {
  
    let data = this.data
    fs.writeFile("rleIn", data.join(" "), () => {})
    // console.log(data)
    let str = [], arrEl = [], arGroupped = [], count = 1, el = null, arr = [data[0]]
    for(let i = 1; i < data.length; i++) { //разбиваем на группы и единицы
        if(data[i-1] === data[i]) {
            
            arr.push(data[i])

        } else {

            arrEl.push(arr)
            arr = []
            arr.push(data[i])
        }
    }
    // console.log(arrEl)
    for(let i = 0; i < arrEl.length; i++){
      
      let temp = []
      while(arrEl[i].length === 1 && i < 128){
        temp.push(arrEl[i++][0])
      }

      if(temp.length){
        arGroupped.push(temp)
        i--
      } else {
        arGroupped.push(arrEl[i])
      }
    }
    // console.log(arGroupped)
    for(let i = 0; i < arGroupped.length; i++) {
      if(arGroupped[i].length > 1){

        if(arGroupped[i][0] === arGroupped[i][1]){ // массив одинаковых эелементов

          str.push(parseInt('1'+ '0'.repeat(8 - arGroupped[i].length) + arGroupped[i].length.toString(2), 2))
          str.push(arGroupped[i][0])

        } else {

          str.push(parseInt(arGroupped[i].length))
          arGroupped[i].forEach((el) => { str.push(el) })

        }

      } else {
        str.push(1)
        str.push(arGroupped[i][0])//если значение одно 
      }
    }
    // console.log(str)

    fs.writeFile('rleOut', str.join(' '), () => {})
});


app.get('/', function (req, res) {
  res.send(data)
});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!')
})