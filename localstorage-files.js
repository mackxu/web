;(function (global) {
    'use strict';

    //检查文件类型
    var TYPE_RE = /\.(js|css)(?=[?&,]|$)/i;
    function fileType(str) {
        var ext = 'js';
        str.replace(TYPE_RE, function (m, $1) {
            ext = $1;
        });
        if (ext !== 'js' && ext !== 'css') ext = 'unknown';
        return ext;
    }

    //将js片段插入dom结构
    function evalGlobal(strScript){
        var scriptEl = document.createElement ("script");
        scriptEl.type= "text/javascript";
        scriptEl.text= strScript;
        document.getElementsByTagName("head")[0].appendChild(scriptEl) ;
    }

    //将css片段插入dom结构
    function createCss(strCss) {
        var styleEl = document.createElement('style');
        document.head.appendChild(styleEl);
        styleEl.appendChild(document.createTextNode(strCss));
    }

    // 在全局作用域执行js或插入style node
    // 向页面插入js、css node
    function defineCode(url, str) {
        var type = fileType(url);
        if (type === "js"){
            evalGlobal(str);
        }else if(type === "css"){
            createCss(str);
        }
    }

    // 将数据写入localstorage
    var setLocalStorage = function(key, item){
        try {
            window.localStorage && window.localStorage.setItem(key, item);
        }catch(e) {         // 当本地存储满了，再往里面写数据，将会触发error
            window.localStorage.clear();
            console.log('localStorage is full!');
        }
    }

    // 从localstorage中读取数据
    var getLocalStorage = function(key){
        return window.localStorage && window.localStorage.getItem(key);
    }

    // 通过AJAX请求读取js和css文件内容，使用队列控制js的执行顺序
    var rawQ = [];
    var monkeyLoader = {
        loadInjection: function(url, onload, bOrder){
            var iQ = rawQ.length;
            if(bOrder){
                var qScript = {key: null, response: null, onload: onload, done: false};
                rawQ[iQ] = qScript;
            }
            
            var ls = getLocalStorage(url);
            if(ls !== null){                        // 有localstorage缓存, 直接执行代码
                if(bOrder){                         // 按顺序加载
                    rawQ[iQ].response = ls;
                    rawQ[iQ].key = url;
                    monkeyLoader.injectScripts();   // 顺序执行代码
                }else{
                    defineCode(url, ls);            // 直接执行代码
                    onload && onload();
                }
            } else {
                var xhrObj = monkeyLoader.getXHROject();
                xhrObj.open('GET', url, true);
                xhrObj.send(null);
                xhrObj.onreadystatechange = function(){
                    if(xhrObj.readyState == 4){
                        if(xhrObj.status == 200){
                            setLocalStorage(url, xhrObj.responseText);      // 本地存储文件代码
                            if(bOrder){
                                rawQ[iQ].response = xhrObj.responseText;
                                rawQ[iQ].key = url;
                                monkeyLoader.injectScripts();
                            }else{
                                defineCode(url, xhrObj.responseText);
                                onload && onload();
                            }
                        }
                    }
                }
            }
        },

        injectScripts: function(){
            var len = rawQ.length;
            
            for (var i = 0; i < len; i++) {             //按顺序执行队列中的脚本
                var qScript = rawQ[i];
                //没有执行
                if(!qScript.done){
                    if(!qScript.response){              //没有加载完成
                        console.error("raw code lost or not load!");
                        //停止，等待加载完成, 由于脚本是按顺序添加到队列的，因此这里保证了脚本的执行顺序
                        break;
                    }else{                              //已经加载完成了
                        defineCode(qScript.key, qScript.response);
                        qScript.onload && qScript.onload();
                        delete qScript.response;        // 此处不解
                        qScript.done = true;
                    }
                }
            }
        },

        getXHROject: function(){
            //创建XMLHttpRequest对象
            var xmlhttp;
            if(window.XMLHttpRequest){
                // code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
            } else {
                // code for IE6, IE5
                xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        }
    };


    global.monkeyLoader = monkeyLoader.loadInjection;

})(this);
