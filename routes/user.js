'use strict';
var router = require('express').Router();




router.get('/test1', function(req, res, next) {
	res.json({
		name: '张三',
		age: 24
	});
});









module.exports = router;