var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(bodyParser.json({ type: 'application/*+json' }));

//parse custom into buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));

//parse HTML body into string
app.use(bodyParser.text({ type: 'text/html' }))

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log('listening on PORT: ' + PORT);
})