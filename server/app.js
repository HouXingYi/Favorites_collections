var express = require('express');
var connect = require('connect');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var db = require('./mongodb/db.js');
var app = express();
var dburl = 'mongodb://127.0.0.1:27017/favorites';

//连接数据库
db();
//sessions//connect-mongo
app.use(session({
  resave:false,
  saveUninitialized:true,
  secret: 'houxingyi',
  cookie: {maxAge: 7*86400*1000 }, //7天
  store: new mongoStore({
    url: dburl,
    collection: 'sessions'
  })
}))
//静态
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//路由
app.use('/', routes);
//404处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// 错误处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.redirect('/404.html')
});

module.exports = app;
