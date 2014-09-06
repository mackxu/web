// a, m 作为形参，确保下面的执行不会修改外部的同名变量
(function(win, doc, o, g, ga, a , m){
    
    win['GoogleAnalyticsObject'] = ga;
    // 确保只执行一次analytics.js的插入
    win[ga] = win[ga] || function() {
        
        // 不知道哪里需要q和l属性???
        (win[ga].q = win[ga].q || []).push(arguments)},
        win[ga].l = 1 * new Date();         // 把时间格式转换成数字型
        
        // 动态加载analytics.js
        a = doc.createElement(o),
        m = doc.getElementsByTagName(o)[0]; // script
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
})(window, document, 'script','//www.google-analytics.com/analytics.js','ga');