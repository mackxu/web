/**
 * Created by mackxu on 16/7/17.
 */
var fs = require('fs');
var logger = require('koa-logger');
var views = require('co-views');
var parse = require('co-body');
var router = require('koa-router')();
var iconv = require('iconv-lite');          // 编码转换模块,支持支持中文
var koa = require('koa');

var app = koa();


app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

// router middleware

router.get('/', list);
router.get('/updatebg/:id', updateConfigJSON);




// Specifying Swig view engine
var render = views(__dirname + '/views', { map: { html: 'swig' } });

var configJSONUrl = './config.js';

/**
 * Todo item List.
 */
function *list() {
    var config = yield read('./config.js');
    config = parseConfigJSON(config);
    console.log(config);

    this.config = config;
    this.body = yield render('tv', { bg: config.backgrounds });
}

function *updateConfigJSON() {
    // 根据id获取对应的bg对象, 更新参数
    // 重写json文件,并上传
    // 上传成功,返回成功信息给客户端
    var id = this.params.id;
    var config = yield read(configJSONUrl);
    config = JSON.parse(config);
    var bg1 = config.bg[id];
    bg1.name = "vipvipvip";
    var res = yield write(configJSONUrl, JSON.stringify(config));
    console.log(res);
    console.log('write file end!');
}



function throw404(context) {
    context.throw('404', 'invalid todo id');
}

function read(file) {
    return function (fn) {
        fs.readFile(file, 'utf8', fn);
    }
}

function write(file, data) {
    return function (fn) {
        fs.writeFile(file, data, 'utf8', fn);
    }
}

/**
 * 解析出config配置
 * @param {string} config
 */
function parseConfigJSON(config) {
    // 分出JSON字符串
    config = config.slice(9, -2);

    // 解析JSON并返回
    return JSON.parse(config);
}

function formateConfigJSON(config) {
    return 'callback(' + JSON.stringify(config) + ')';
}


app.listen(3000);
console.log('listening on port 3000');