/**
 * Created by mackxu on 16/7/16.
 */
// 一个简单的co实现
function co(fn) {
    return function (done) {
        var self = this;
        var gen = fn.call(self);
        var it = null;
        var _next = function (err, res) {
            if(err) res = err;
            // { value: fn, done: false }
            it = gen.next(res);             // get res 传递给next当实参
            if(!it.done) {
                it.value(_next);
            }
        };

        _next();                            // 1 next
    }
}

var fs = require('fs');

// one thunk function
function read(file) {
    return function (fn) {
        fs.readFile(file, 'utf8', fn);      // fn: next
    }
}

co(function *() {
    var c = 2;
    console.log(c);
    var a = yield read('./package.json');       // 2 next
    console.log(a.length);

    var b = yield read('./app.js');             // 3 next
    console.log(b.length);
})();
