'use strict';
const express = require('express');
const router = express.Router();

// 引入user路由
router.use('/user', require('./user'));
// 引入address路由
router.use('/address', require('./address'));
// 引入goods路由
router.use('goods', require('./goods'));



















module.exports = router;