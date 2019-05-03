//inport modules
var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var Connection = require('mssql')
var Request = require('mssql')
var sql = require('mssql')


//view setting
app.set("view engine", 'ejs');

//set middlewares 서버에 도착한 신호는 router를 통해서 어떤 response를 할지 결정되는데 router 통하기 전에 모든신호들에게 수행되는 명령어! app.use()를 통해 수행. 당연히 router보다 위에 위치해야한다.
app.use(express.static(path.join(__dirname + 'public')));
app.use(bodyParser.json());

var data={count:0};
app.get('/', function (req,res) {
  data.count++;
  res.render('my_first_ejs', data);
});

app.get('/reset', function (req,res) {
  data.count=0;
  res.render('my_first_ejs', data);
});

app.get('/set/count', function (req,res) {
  if(req.query.count) data.count=req.query.count;
  res.render('my_first_ejs', data);
});

app.get('/set/:num', function (req,res) {
  data.count=req.params.num;
  res.render('my_first_ejs', data);
});

app.listen(3000, function(){
  console.log('Server On!');
})
