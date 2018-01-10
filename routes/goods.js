'use strict';
var router = require('express').Router();




router.get('/test2', function(req, res, next) {
	res.json({
		name: '王五',
		age: 78
	});
});









module.exports = router;