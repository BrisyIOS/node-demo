'use strict';
var router = require('express').Router();




router.get('/test2', function(req, res, next) {
	res.json({
		name: '李四',
		age: 36
	});
});









module.exports = router;