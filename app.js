/**
 * Created by Brisy on 2017/6/2.
 */
'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();



// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// 设置静态文件
app.use(express.static('public'));
app.use(express.static('images'));


// 设置默认超时时间
app.use(timeout('15s'));

// 设置参数解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




//设置跨域访问
app.all('*',function (req, res, next) {
    //res.set('Access-Control-Allow-Headers', 'NonceStr, CurTime, CheckSum');
    res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
    res.set('Access-Control-Allow-Origin', '*');
    next();
});

// 加载路由文件
app.use('/api', require('./routes/base'));


// 域名默认访问地址
app.get('/', function (req, res) {
    res.render('index');
});
  

// 测试
app.get('/test', function (req, res) {
    res.json({message: 'success'});
});




app.use(function(req, res, next) {
    // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
    if (!res.headersSent) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    }
});

// error handlers
app.use(function(err, req, res, next) {
    if (req.timedout && req.headers.upgrade === 'websocket') {
        // 忽略 websocket 的超时
        return;
    }
    var statusCode = err.status || 500;
    if (statusCode === 500) {
        console.error(err.stack || err);
    }
    if (req.timedout) {
        console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
    }
    res.status(statusCode);
    // 默认不输出异常详情
    var error = {}
    if (app.get('env') === 'development') {
        // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
        error = err;
    }
    res.render('error', {
        message: err.message,
        error: error
    });
});









module.exports = app;