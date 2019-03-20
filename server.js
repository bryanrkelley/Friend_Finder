var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var PORT = process.env.PORT || 8080;

//Create app/json parser
var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.use(bodyParser.json({ type: 'application/*+json' }));

//parse custom into buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

//parse HTML body into string
app.use(bodyParser.text({ type: 'text/html' }))


app.listen(PORT, function() {
    console.log('listening on PORT: ' + PORT);
})