var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var mysql = require('mysql');//引用类库
var mosca = require('mosca');

//fs filesystem
var fs = require('fs');
var http = require('http');
//fs filesystem

var routes = require('./routes/index');
var users = require('./routes/users');
var mqtt = require('./routes/mqtt');
var echart = require('./routes/echart');
var admin = require('./routes/admin');
var online = require('./routes/online')

var app = express();


app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'3.2.1');
    res.header("Content-Type","application/json;charset=utf-8");
    next();
});
// view engine setup
app.set('views', path.join(__dirname, 'public/online/www'));
app.set('view engine', 'html');
//something change in here --date:12-20
//nothing changed in the front


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:'chenliang',//使用128字符的随机字符串
    cookie:{maxAge: 60*60*1000 },//设置有效时间
    saveUninitialized:true,
    resave:true,
    name:'chenlaing'
    /*genid:function(req){
        return genuuid()
    }*/

}));

/*12-20__dirname
 * useless way
 * */
app.get('/1220',function(req,res){
    console.log('\n1220');
    //res.writeHeader(200,{'Content-Type':"text/html"});
    console.log(req)
    res.sendfile(__dirname+'/public/online/www/x5/UI2/hello1204/guanli.w.html');
})

//fs another chuankou
fs.readFile('./public/online/www/x5/UI2/hello1204/guanli.w',function(err,html){
    if(err){
        throw err;
        console.log("fs have error:at appljs line 66: "+err);
    }
    http.createServer(function(request,response){
        response.writeHeader(200,{'Content-Type':"text/html"})
        console.log('time is '+new Date())
        response.write(html);
        response.end();
    }).listen(1212)
    console.log(__dirname)
})
//fs another chuankou






app.use('/', routes);
app.use('/users', users);
app.use('/mqtt', mqtt);
app.use('/echart',echart);
app.use('/admin',admin);
app.use('/onlinetry',express.static(__dirname+'/public'));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
