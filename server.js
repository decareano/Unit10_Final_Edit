var express = require('express');
var path = require('path');
const pg = require('pg');
var bodyParser = require("body-parser");


var app = express();

const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/car_buying';

const client = new pg.Client(connectionString);
client.connect();

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
});

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({extended: true}));


app.post('/api/car_buying', (req, res, next) => {
    const results = [];
    var myArray = req.body;
    console.log('input', myArray);
    console.log(myArray["carname"].toString());
    


  // Grab data from http request
  // Here: you will need to set the data object to take the information passed from our ajax request
  const data = {
    price: parseInt(myArray["price"], 10),
    model: myArray["model"],
    color: myArray["color"]
  };

  console.log(data);
  
  //const data = {id: myArray, model: req.body.text, color: req.body.text, price: req.body.text};
  
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO features(price, model, color) values($1, $2, $3)',
    [data.price, data.model, data.color]);
    // SQL Query > Select Data
    const query = client.query('SELECT * FROM features ORDER BY id ASC');
    // Stream results back one row at a time
    query.on('row', (row) => {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', () => {
      done();
      return res.json(results);
    });
  });

});

  


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});



