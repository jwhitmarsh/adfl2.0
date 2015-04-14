var express = require('express');
var path = require('path');

var app = express();

app.use(require('connect-livereload')());

app.use(express.static(path.normalize(__dirname + '/../client')));

var server = require('http').createServer(app);
server.listen(7777, function () {
	console.log('adfl on 7777');
});

// Expose app
exports = module.exports = app;