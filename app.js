
//console.log(__dirname);
///*/*----------------------------------------------------------------------------------------------*///npm install tedious 후 복붙va
var sql = require('mssql');
var Connection = require('tedious').Connection;     //tedious폴더 mssql로 이름 변경
var Request = require('tedious').Request;



var config = {
    server: '192.168.0.97',
    options: { encrypt:false, database: 'Test_MJ' },
    authentication:{
        type:"default",
        options:{
            userName:"MJ",
            password:"1234"
        }
    }
};


var connection = new Connection(config);
connection.on('connect', function(err) {
    console.log("Connected");
    executeStatement();
});

function executeStatement(){
request = new Request("select Convert(char(10),getdate(),121) as TargetDate, newid()", function(err, rowCount) {
        if (err) {
            console.log(err);
        } else {
            console.log(rowCount + ' rows');
        }
    });

    request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log(column.value);
        });
    });

    connection.execSql(request);
}


/*----------------------------------------------------------------------------------------------*/
var express = require('express');
var path = require('path');
var app = express();

app.set("view engine", 'ejs');
app.use(express.static(path.join(__dirname + 'public')));

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
