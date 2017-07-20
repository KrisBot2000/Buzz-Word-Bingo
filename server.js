
let bodyParser = require('body-parser');
let express = require('express');

let app = express();
let port = 8080;
let buzzWords = [];
let justBuzzWords = [];
let score = 0;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/buzzwords', function (req, res) {
  res.json({buzzWords: buzzWords});
});


app.post('/buzzword', function (req, res) {
  if(typeof req.body.buzzWord==='string' && typeof parseInt(req.body.points)==='number' && buzzWords.length < 5 && justBuzzWords.indexOf(req.body.buzzWord) === -1){

    buzzWords.push({buzzWord: req.body.buzzWord, points: parseInt(req.body.points), heard: false});
    justBuzzWords.push(req.body.buzzWord);
    console.log(justBuzzWords);
    console.log(buzzWords);
    res.json( { "success": true } );
    }else{
      res.json( { "sucess": false } );
    }
});


app.put('/buzzword', function (req, res) {
  buzzWords.forEach(function(obj){
    console.log(req.body);
    if(obj.buzzWord===req.body.buzzWord && obj.heard===false){
      obj.heard = true;
      score =+ obj.points;
      console.log(score);
      res.json( { "success": true } );
    }else{
      res.json( { "sucess": false } );
    }
  });
});


app.delete('/buzzword', function (req, res) {
  let index = justBuzzWords.indexOf(req.body.buzzWord);
  console.log(index);
  if(index !== -1){
    buzzWords.splice(index, 1);
    console.log(buzzWords);
    justBuzzWords.splice(index, 1);
    console.log(justBuzzWords);
    res.json( { "success": true } );
  }else{
    res.json( { "sucess": false } );
  }
});


app.post('/reset', function (req, res) {
  if(req.body.reset==="true"){
    buzzWords = [];
    justBuzzWords = [];
    res.json( { "success": true } );
  }else{
    res.json( { "success": false } );
  }
});


var server = app.listen(port, function () {
  console.log('listening at http://localhost:' + port);
});