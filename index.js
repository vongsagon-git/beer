/////////////////////////////////////////////////////// //HEAD require NPM
const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
var Promise  = require('promise')
var mongojs  = require('mongojs')
var mydb = mongojs('mydb')
///////////////////////////////////////////////////////




app.get('/', function (req, res) {
  res.send('SYSTEM')
})


app.get('/login2', function (req, res) {
  res.send('<html><form id="myForm" action="/checklogin" method="post"><input type="text" name="keytag" /input><button type="submit"/></form></html>')
})


app.get('/login', function (req, res) {
res.sendFile(path.join(__dirname+'/login.html'));
})


// function check member for login
app.post('/checklogin', (req, res) => {
  var keytag = req.body.keytag
//  console.log(keytag);
  checkMember(keytag,res)
})

// function check member for login
app.post('/checklogin2', (req, res) => {
  var keytag = req.body.keytag
  console.log(keytag);
  checkMember(keytag,res)
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


async function checkMember(_data,res){
  await checkMemberFromMongo(_data,res);
}


async function writejson(_data,res){
  await writeJsonToMongo(_data,res);
}

///////////////////////////////////////////////////////

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


///////////////////////////////////////////////////////
async function checkMember(_data,res){
  await checkMemberFromMongo(_data,res);
}

function checkMemberFromMongo(_data,res){
  return new Promise(function(resolve,reject){
    var mywritecollection = mydb.collection('member');

console.log(_data)

   mywritecollection.findOne({_id:_data}, function(err,docs){
     try{
       res.send(docs.name);
     }
     catch(err){
       res.send('555');
     }

   });

});

}



///////////////////////////////////////////////////////
async function checkMember(_data,res){
  await checkMemberFromMongo(_data,res);
}

function checkMemberFromMongo(_data,res){
  return new Promise(function(resolve,reject){
    var mywritecollection = mydb.collection('member');

console.log(_data)

      mywritecollection.findOne({_id:_data}, function(err,docs){
     try{


       var product = [{"name":"leo","price":69},{"name":"singha","price":79},,{"name":"ice","price":20}];

       var htmltxt='';

       htmltxt+= '<script>';

       htmltxt+= 'function addorder(name) {';
       for(data in product){
       htmltxt+= 'if(name=="'+ product[data].name +'"){document.getElementById("'+product[data].name+'").value = parseInt(document.getElementById("'+product[data].name+'").value)+1;document.getElementById("'+product[data].name+'_btn").innerHTML="'+ product[data].name +'"+" = "+document.getElementById("'+product[data].name+'").value;}';
       }

       htmltxt+= '';
       htmltxt+= 'updatejson();}';

       htmltxt+= 'function updatejson() {';

       for(data in product){
       htmltxt+= 'var '+product[data].name+'='+product[data].price+';';
       }

       htmltxt+= 'var total=0;';
       htmltxt+= 'var jsontxt="";';

       htmltxt+= 'jsontxt+="{\\"member\\":\\"'+ docs.name +'\\",";';
       htmltxt+= 'jsontxt+="\\"keytag\\":\\"'+ docs._id +'\\",";';

       for(data in product){
       htmltxt+= 'total+=parseInt(document.getElementById("' + product[data].name + '").value)*' + product[data].price + ';';
       htmltxt+= 'jsontxt+="\\"' + product[data].name + '\\":"+parseInt(document.getElementById("' + product[data].name + '").value)+",";';
       }

       htmltxt+= 'jsontxt+="\\"total\\":"+total+"}";';

       htmltxt+= 'document.getElementById("jsontxt").value = jsontxt;';
       htmltxt+= 'document.getElementById("total").value = total;';

       htmltxt+= '}';
       htmltxt+= '</script>';



       htmltxt+= '<h1>' + docs.name + docs._id  + '</h1>';
       htmltxt+= '<form id="myForm" action="/order" method="post">';
       htmltxt+= '<input type="hidden" name="member" value="' + docs.name  + '">';
       htmltxt+= '<input type="hidden" name="keytag" value="' + docs._id  + '">';
       htmltxt+= '<input type="text" name="total" id="total" value=0>';
       htmltxt+= '<input type="text" name="jsontxt" id="jsontxt">';

       for(data in product){
       htmltxt+= '<input type="hidden" name="' + product[data].name + '" id="' +product[data].name + '" value=0>';
       }


       htmltxt+= '<li>';

       for(data in product){
           htmltxt+= '<button style="font-size:15px;height:60px;width:150px;background-color: #FFAF50;" type="button" id="' + product[data].name + '_btn" onclick="addorder(' + "'"  + product[data].name + "'" +')" value="">'+product[data].name+'</button>';
       }

       htmltxt+= '</li>';


       res.send(htmltxt);
     }
     catch(err){
       res.redirect('/login');
     }

   });

});

}
