const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

let cors = require('cors');
let http = require('http');
const request = require('request');

const app = express();
//app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);

app.get('/ping', cors(), function (req, res) {
  console.log("req",req);
  request('http://etlexporter.vip.qa.ebay.com/v1/configuration/getActive?etlName=Comics%20US', function (error, response, body) {
   /* console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.*/
    res.send(body);
  });
});

app.get('/', cors(), function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
