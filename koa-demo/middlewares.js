/**
 * Created by mackxu on 16/7/17.
 */
var co = require('co');

function SimpleKoa() {
    this.middlewares = [];
}
SimpleKoa.prototype = {
    // 用于中间件注入
    use: function (gf) {
        this.middlewares.push(gf);
    },
    // 执行中间件
    listen: function () {
        this._run();
    },
    _run: function () {
        var self = this;
        var middlewares = self.middlewares;

        return co(function *() {
            var prev = null;
            var i = middlewares.length;
            // prev 将后一个中间件传递给前一个
            while (i--) {
                prev = middlewares[i].call(self, prev);
            }
            yield prev;                 // start!!
        });
    }
};

var app = new SimpleKoa();
app.use(function *(next) {
    this.body = 1;
    yield next;
    this.body = 5;
    console.log(this.body);
});

app.use(function *(next) {
    this.body = 2;
    yield next;
    this.body = 4;
});

app.use(function *(next) {
    this.body = 3;
});

app.listen();