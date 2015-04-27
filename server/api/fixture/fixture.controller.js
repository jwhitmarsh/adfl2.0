var _ = require('lodash');

var Fixture = require('./fixture.model');

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

exports.update = function (req, res) {
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
				return handleError(res, err);
			}
			return res.json(200);
		});
	});
};

function handleError(res, err) {
	return res.send(500, err);
}