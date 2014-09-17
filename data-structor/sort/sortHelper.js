define({
    swap: function(k1, k2, arr) {
        var c = arr[k1]; arr[k1] = arr[k2], arr[k2] = c;
    },
    pushArray: function(s, n) {
    	[].push.apply(s, n);
    }
});