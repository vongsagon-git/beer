

///////////////////////////////////////////////////////
//HEAD require NPM
const express = require('express')
const bodyParser = require('body-parser')
const app = express() //assign express เป็น app
app.use(bodyParser.urlencoded({ extended: true })); //ให้ app ใช้ middleware bodyParser อ่าน urlencoded
var Promise  = require('promise')
var mongojs  = require('mongojs')
var mydb = mongojs('mydb') //assign DB เป็น mydb
///////////////////////////////////////////////////////

//แสดงหน้า index
app.get('/', function (req, res) {
  res.send('SYSTEM')
})

// function
app.post('/่json', (req, res) => {
  var txt = req.body.jsontxt
  //res.send(txt);
  //var data=req;
  //var data='{"name":"vongsagon","sname":"boonsawat"}'
  console.log(txt);
  var json = JSON.parse(txt);
  console.log(json);
  writejson(json,res)
})

//app.get('/user/:id', function (req, res) {
    //var id = req.params.req.body.id;
    //res.send("HELLO "+id);
//});

//app.get('/user/:id/:id2', function (req, res) {
    //var id = req.params.id;
    //var id2 = req.params.id2;
    //res.send("HELLO "+id+" "+id2);
//});

//app.post('/post2', (req, res) => {
  //var txt = req.body.name
  //res.send(txt);
  //console.log(txt)
 // writedata(txt,res)
//})

//app.post('/post', (req, res) => {
  //var txt = req.body.name
  //res.send(txt);
  //console.log(txt)
 // writedata(txt,res)
//})



app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

///////////////////////////////////////////////////////






async function writejson(_data,res){
  await writeJsonToMongo(_data,res);
}



function writeJsonToMongo(_data,res){
  return new Promise(function(resolve,reject){
    var mywritecollection = mydb.collection('mycollection');



mywritecollection.aggregate([{$match:{PAY:{$gt:0,$lt:10}}},{$group:{_id:null,txt:{$sum:"$LEO"}}}], function (err, res) {
    console.log(JSON.stringify(res))
})

//mywritecollection.insert(_data, function(err){
//      if(err){
//        console.log(err);
//        res.send(String(err));
//      }else{
//        console.log('record data ok');
//        res.send('record data ok');
//      }
//   });

   mywritecollection.insert(_data, function(err){
      if(err){
        console.log(err);
        res.send(String(err));
      }else{
        console.log('record data ok ok ok ok');
        res.send('record data ok');
      }
   });
  });
}
