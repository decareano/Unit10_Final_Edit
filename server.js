var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/index.html'));
})

app.use(express.static(path.join(__dirname + '/public')));

app.post('/api/car_buying', (req, res, next) => {
  const results = [];
  // Grab data from http request
  // Here: you will need to set the data object to take the information passed from our ajax request
  const data = {id: req.body.text, model: req.body.text, color: req.body.text, price: req.body.text};
  
  // Get a Postgres client from the connection pool
  pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
      done();
      console.log(err);
      return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO features(id, model, color, price) values($1, $2)',
    [data.text, data.complete]);
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
})