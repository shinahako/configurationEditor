const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

let http = require('http');
const request = require('request');

const app = express();
//app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));


app.get('/getData', function (req, res) {
  console.log("req",req.query);
  request(req.query.url, function (error, response, body) {
   /* console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.*/
    res.send(body);
  });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
