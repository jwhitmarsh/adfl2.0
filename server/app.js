var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/adfl', {});

var app = express();

app.use(require('connect-livereload')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.normalize(__dirname + '/../client')));
app.use('/api/fixtures', require('./api/fixture'));
app.use('/api/teams', require('./api/team'));
app.use('/api/login', require('./api/login'));

// All undefined asset or api routes should return a 404
//app.route('/:url(api|auth|components|app|bower_components|assets)/*')
//	.get(errors[404]);

app.route('/*')
	.get(function(req, res) {
		res.sendfile(path.normalize(__dirname + '/../client/index.html'));
	});

var server = require('http').createServer(app);
server.listen(7777, function () {
	console.log('adfl on 7777');
});

// Expose app
exports = module.exports = app;