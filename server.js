var express = require('express');
var path = require('path')
var app = express();

app.use('/', express.static('static'));
app.use('/css', express.static(path.join(__dirname,'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

app.listen(8080, () => console.log("starting server at localhost:8080"));
