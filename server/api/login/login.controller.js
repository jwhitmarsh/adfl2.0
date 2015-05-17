exports.index = function (req, res) {
	if (req.body.password === 'Kb07Ewo') {
		return res.send(200);
	} else {
		return res.send(500, {});
	}
};