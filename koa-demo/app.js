var koa = require('koa');
var router = require('koa-router');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));           // 创建promise版本的fs

var app = koa();


app.use(function *(next) {
    console.log('start time => ', +new Date());
    yield next;
    console.log('end time => ', +new Date());
});


app.use(function *(){
    // this.body = 'Hello World';

    // var path = this.path;
    this.body = yield fs.readFileAsync('./app.js', 'utf8');
});

app.listen(3000);
console.log('now listening on port 3000');