'use strict';

var express = require('express');
var controller = require('./team.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/team/:id', controller.show);

module.exports = router;
