/**
 * Created by mackxu on 16/7/16.
 */
// demo for es6 generator

var r = 3;

function* finite_ap(a) {
    for(var i = 0; i < 3; i++) {
        a = a + r;
        yield a;

        console.log(i);
    }
}

var sum = finite_ap(5);

console.log(sum.next());
console.log(sum.next());
console.log(sum.next());
console.log(sum.next());