'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var FixtureSchema = new Schema({
	week: Number,
	deadline: Date,
	matches: [{
		home: {
			team: String,
			score: Number
		},
		away: {
			team: String,
			score: Number
		}
	}]
});

module.exports = mongoose.model('Fixture', FixtureSchema);
