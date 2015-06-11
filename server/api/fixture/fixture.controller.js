var _ = require('lodash');
var async = require('async');

var Fixture = require('./fixture.model');
var Team = require('../team/team.model');

exports.index = function (req, res) {
	Fixture.find(function (err, fixtures) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, fixtures);
	});
};

// Get a single host
exports.show = function (req, res) {
	Fixture.findById(req.params.id, function (err, fixture) {
		if (err) {
			return handleError(res, err);
		}
		if (!fixture) {
			return res.send(404);
		}
		return res.json(fixture);
	});
};

exports.byTeam = function (req, res) {
	var returnFixtures = [], teamName;
	async.series([
			function (cb) {
				Team.findById(req.params.id, function (err, team) {
					if (err) {
						return handleError(res, err);
					}
					if (!team) {
						return res.send(404);
					}
					teamName = team.name;
					console.log(teamName);
					cb(0);
				});
			},
			function (cb) {
				Fixture.find(function (err, fixtures) {
					if (err) {
						return handleError(res, err);
					}
					if (!fixtures) {
						return res.send(404);
					}

					for (var i = 0; i < fixtures.length; i++) {
						var fixture = fixtures[i];
						for (var m = 0; m < fixture.matches.length; m++) {
							var match = fixture.matches[m];
							if (match.home.team === teamName || match.away.team === teamName) {
								returnFixtures.push(match);
							}
						}
					}
					cb(0);
				});
			}],
		function (err) {
			if (err) {
				return handleError(res, err);
			}
			if (!returnFixtures) {
				return res.send(404);
			}
			return res.json(returnFixtures);
		});
};

exports.update = function (req, res) {
	console.log('saving');
	Fixture.findById(req.params.id, function (err, fixture) {
		if (err) {
			cb(err);
		}
		if (!fixture) {
			return res.send(404);
		}
		var updated = fixture;
		updated.matches = req.body.matches;
		updated.save(function (err) {
			if (err) {
				console.error(err);
				return handleError(res, err);
			}
			console.log('saved');
			return res.json(200);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}