var now = function() { return +(new Date()); }
var t_s = now();
while(now() - t_s < 1000) { 
    console.log(1) 
}

console.log(t_s);
