/**
 * Created by mackxu on 16/7/16.
 */
var co = require('co');
var fs = require('fs');

// 封装
function read(file) {
    return function (fn) {
        fs.readFile(file, 'utf8', fn);
    }
}

co(function *() {
    var a = yield read('./package.json');
    a = JSON.parse(a);
    console.log(a.name);

    var b = yield read('./views/index.html');
    console.log(b);
});