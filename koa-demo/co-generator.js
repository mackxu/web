/**
 * Created by mackxu on 16/7/16.
 */

// Utils tools
// 判断是不是generator函数
function isGeneratorFunc(obj) {
    var constructor = obj.constructor;
    if(!constructor) return false;
    if('GeneratorFunction' === constructor.name || 'GeneratorFunction' === constructor.displayName) return true;
    return isGenerator(constructor.prototype);
}

// 判断是不是generator对象
function isGenerator(obj) {
    return 'function' === typeof obj.next && 'function' === typeof obj.throw;
}

function co(fn) {
    return function (done) {
        var self = this;
        var gen = fn.call(self);
        var it = null;
        var _next = function (err, res) {
            if(err) res = err;
            // { value: fn, done: false }
            it = gen.next(res);             // get res
            if(!it.done) {
                if(isGeneratorFunc(it.value)) {
                    co(it.value).call(self, _next);
                }else {
                    it.value(_next);
                }
            }else {
                done && done.call(self);
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

function *gf1() {
    this.a = yield read('./package.json');
}

function *gf2() {
    this.b = yield read('./app.js');
}

co(function *() {
    yield gf1;
    yield gf2;

    console.log(this.a.length);
    console.log(this.b.length);
})();