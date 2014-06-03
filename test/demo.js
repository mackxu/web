    // 先执行循环后, 页面解析完成
    var testFunc = function () {
        for (var i = 0; i < 50000; i++) {
            console.log(i)
        };
    }
    testFunc();