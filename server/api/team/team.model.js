'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var TeamSchema = new Schema({
	name: String,
	p1: String,
	p2: String,
	seeded: Boolean
});

module.exports = mongoose.model('Team', TeamSchema);
