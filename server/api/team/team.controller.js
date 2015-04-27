var Team = require('./team.model');

exports.index = function (req, res) {
	Team.find(function (err, teams) {
		if (err) {
			return handleError(res, err);
		}
		return res.json(200, teams);
	});
};

// Get a single host
exports.show = function (req, res) {
	Team.findById(req.params.id, function (err, team) {
		if (err) {
			return handleError(res, err);
		}
		if (!team) {
			return res.send(404);
		}
		return res.json(team);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}