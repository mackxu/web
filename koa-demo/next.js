/**
 * Created by mackxu on 16/7/17.
 */
// next()方法的参数
function* f() {
    for(var i=0; true; i++) {
        var res = yield i;          // res 是next参数值
        if(res === 2) i -=1;
    }
}

var gen = f();
// console.log(gen.next());            // value 是yield后面的值
console.log(gen.next());
console.log(gen.next(2));