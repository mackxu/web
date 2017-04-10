web
===

### 2 submit text2的注册信息
Andrew Weber
Single User License
EA7E-855605
813A03DD 5E4AD9E6 6C0EEB94 BC99798F
942194A6 02396E98 E62C9979 4BB979FE
91424C9D A45400BF F6747D88 2FB88078
90F5CC94 1CDC92DC 8457107A F151657B
1D22E383 A997F016 42397640 33F41CFC
E1D0AE85 A0BBD039 0E9C8D55 E1B89D5D
5CDB7036 E56DE1C0 EFCC0840 650CD3A6
B98FC99C 8FAC73EE D2B95564 DF450523		

js项目练习
使用标签而不是直接在搜索框中插入默认值的做法的优点
可以将相同的文本用到任意文本输入框，而不必担心会与验证脚本冲突

error: failed to push some refs to 'git@github.com:anodejs/system.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Merge the remote changes (e.g. 'git pull')
hint: before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.

解决当出现的错误：
1. remote --> fetch     获取最新版本库
2. merge --> 本地合并   与本地的合并
3. push                 上传


2013/07/29

运动框架
开启定时器之前，清除之前的定时器

	window.onload = function() {
	    var btn = document.getElementById('btn');
	    var oDiv = document.getElementById('div1');
	    var timer = null;
	    btn.onclick = function() {
	        clearInterval(timer);                   // 避免定时器叠加
	        var timer = setInterval(function() {    // 设置定时器，定义动画
	            if (oDiv.offsetLeft > 300) {        // 动画的结束条件
	                clearInterval(timer);
	            }else {                             // 动画的内容
	                oDiv.style.left = oDiv.offsetLeft + 10 + 'px';
	            }
	        }, 30);
	    };
	};

用函数封装动画

	var timer = null;
	// elem: 运动的元素
	// iTarget: 运动的目标
	// iSpeed: 动画的速度
	function animate(elem, iTarget, iSpeed) {
	    clearInterval(timer);
	    timer = setInterval(function() {
	        var offsetLeft = elem.offsetLeft;
	        if(offsetLeft > iTarget) {
	            clearInterval(timer);
	        }else {
	            elem.style.left = offsetLeft + iSpeed + 'px';
	        }
	    }, 30);
	}

运动框架的基本步骤：
1.  清除定时器
2.	计算速度，开启定时器
3.	判断停止条件，执行运动
根据目标判断速度方向

	var timer = null;
	// elem: 运动的元素
	// iTarget: 运动的目标
	// iSpeed: 速度
	function animate(elem, iTarget, iSpeed) {
	    // 计算速度
	    iSpeed = elem.offsetLeft < iTarget ? iSpeed : - iSpeed;
	
	    clearInterval(timer);    
	    timer = setInterval(function() {
	        var offsetLeft = elem.offsetLeft;
	        if(offsetLeft === iTarget) {
	            clearInterval(timer);
	        }else {
	            elem.style.left = offsetLeft + iSpeed + 'px';
	        }
	    }, 30);
	}
淡入淡出，改变元素的透明度。需要有一个变量保存透明度值，用来和速度加减，然后赋值给元素的样式，从而实现淡入淡出。

	var timer = null;
	var opacity = 30;                   // 默认透明度
	function animate(elem, iTarget, iSpeed) {
	    // 计算速度
	    iSpeed = opacity < iTarget ? iSpeed : - iSpeed;
	    clearInterval(timer);    
	    timer = setInterval(function() {
	        if(opacity === iTarget) {
	            clearInterval(timer);
	        }else {
	            opacity += iSpeed;      // 改变当前透明度
	            elem.style.filter = 'alpha(opacity:' + opacity + ')';
	            elem.style.opacity = opacity / 100;
	        }
	    }, 30);
	}
缓冲运动，改变速度值，每次累加的速度值变小，物体改变的距离越来越变小。
物体运动逐渐变慢，最后停止。
对于速度：距离越远，速度越大；速度 = （目标点-当前值）/ 缩放系数
问题：1. 速度需要取整（正向速度向上取整，负向速度向下取整）原因是样式的像素会舍去小数部分
2.	潜在问题，目标值不是整数时（跟随页面滚动的缓冲侧边栏）

	var timer = null;
	function animate(elem, iTarget) {
	
	    clearInterval(timer);    
	    timer = setInterval(function() {        
	        var offsetLeft = elem.offsetLeft;
	        // 对正向速度向上取整，对负向速度向下取整
	        var iSpeed = (iTarget - offsetLeft) / 8;
	        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	        if(offsetLeft === iTarget) {                // 运动停止条件
	            clearInterval(timer);
	        }else {
	            elem.style.left = offsetLeft + iSpeed + 'px';
	        }
	    }, 30);
	}
运动终止条件
匀速运动，与目标点足够近(距离小于速度时，可把目标设为物体的终点)；
利用绝对值可以避免判断方向问题
缓冲运动，与目标点重合；
多物体运动
每个运动物体都能开启一个属于自己的定时器。做法把定时器作为物体的属性，这样清理时针对自己。
参数的传递，物体与目标值
关键点，所有变量不能共享。（如把定时器变量作为物体的属性）

	function animate(elem, iTarget) {
	    clearInterval(elem.timer);    
	    elem.timer = setInterval(function() {        
	        var offsetWidth = elem.offsetWidth;
	        // 对正向速度向上取整，对负向速度向下取整
	        var iSpeed = (iTarget - offsetWidth) / 8;
	        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	        if(offsetWidth === iTarget) {                // 运动停止条件
	            clearInterval(elem.timer);
	        }else {
	            elem.style.width = offsetWidth + iSpeed + 'px';
	        }
	    }, 30);
	}
多物体淡入淡出时，也出现同样的情况。必须针对每一个物体设置透明度属性（不能共享，只能独享）
	function animate(elem, iTarget) {
	
	    clearInterval(elem.timer);    
	    elem.timer = setInterval(function() {        
	        
	        // 对正向速度向上取整，对负向速度向下取整
	        var iSpeed = (iTarget - elem.opacity) / 8;
	        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	        if(elem.opacity === iTarget) {                // 运动停止条件
	            clearInterval(elem.timer);
	        }else {
	            elem.opacity += iSpeed;
	            elem.style.filter = 'alpha(opacity:'+ elem.opacity +')';
	            elem.style.opacity = elem.opacity / 100;
	        }
	    }, 30);
	}
物体大小属性（offsetWidth / offsetHeight）的Bug。
原因：offsetWidth包含了border的宽，对拥有边框的div不等于其width属性
解决办法：获取真正的width值。
	
	// 返回指定属性的属性值
	// 返回值是整数
	function getStyle(elem, attr) {
	    var value = null;
	    if(elem.currentStyle) {
	        value = elem.currentStyle[attr];
	    }else {
	        value = getComputedStyle(elem, null)[attr];
	    }
	    return value;
	}

任意值运动
高度、宽度、透明度、位置。抽象animate函数
	
	function animate(elem, attr, iTarget) {
	
	    clearInterval(elem.timer);    
	    elem.timer = setInterval(function() {        
	        var iCur = getStyle(elem, attr);                // 获取当前attr属性值
	        if (attr === 'opacity') {
	            iCur = parseFloat(iCur * 100);
	        }
	        iCur = parseInt(iCur);                          // 转换成整形，待计算
	
	        var iSpeed = (iTarget - iCur) / 8;              // 缓冲运动计算每次速度
	        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	
	        if (iCur === iTarget) {
	            clearInterval(elem.timer);
	        }else {
	            if (attr === 'opacity') {
	                iCur += iSpeed;
	                elem.style.filter = 'alpha(opacity:'+ iCur +')';
	                elem.style.opacity = iCur / 100;
	            }else {
	                elem.style[attr] = iCur + iSpeed + 'px';
	            }        
	        }
	    }, 30);
	}

链式运动
简单地说，一个动画结束时另一个动画开始。(利用回调函数)
	
	function animate(elem, attr, iTarget, callback) {
	
	    clearInterval(elem.timer);    
	    elem.timer = setInterval(function() {        
	        var iCur = getStyle(elem, attr);                // 获取当前attr属性值
	        if (attr === 'opacity') {
	            iCur = parseFloat(iCur * 100);
	        }
	        iCur = parseInt(iCur);                          // 转换成整形，待计算
	
	        var iSpeed = (iTarget - iCur) / 8;              // 缓冲运动计算每次速度
	        iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	
	        if (iCur === iTarget) {
	            clearInterval(elem.timer);
	            callback && callback();
	        }else {
	            if (attr === 'opacity') {
	                iCur += iSpeed;
	                elem.style.filter = 'alpha(opacity:'+ iCur +')';
	                elem.style.opacity = iCur / 100;
	            }else {
	                elem.style[attr] = iCur + iSpeed + 'px';
	            }        
	        }
	    }, 30);
	}
	window.onload = function() {
	    var oBtn = document.getElementById('btn');
	    var oDiv = document.getElementById('div1');
	
	    oBtn.onclick = function() {
	        animate(oDiv, 'left', 800, function() {                 // 向右滑动到800px
	            animate(oDiv, 'width', 300, function() {            // 然后，宽度增大到300
	                animate(oDiv, 'height', 400, function() {       // 然后，高度增大到400
	                    animate(oDiv, 'opacity', 100);              // 最后，透明度为不透明
	                });
	            });
	        });
	    };
	
	};
多属性同时改变

目前的运动框架每次运动只能改变一种属性的值.可以通过传递属性/目标值组成的字面量，来同时改变多个属性。
	
	// 返回指定属性的属性值
	function getStyle(elem, attr) {
	    var value = null;
	    if(elem.currentStyle) {
	        value = elem.currentStyle[attr];
	    }else {
	        value = getComputedStyle(elem, null)[attr];
	    }
	    return value;
	}
	
	// attrs 多属性组成的字面量对象
	function animate(elem, attrs, callback) {
	
	    clearInterval(elem.timer);    
	    elem.timer = setInterval(function() {        
	        bStop = true;                                       // 检查所有的属性是否已经达到目标
	        for(var attr in attrs) {                            // 遍历每一个属性
	            
	            var iCur = getStyle(elem, attr);                // 获取当前attr属性值
	            if (attr === 'opacity') {
	                iCur = parseFloat(iCur * 100);
	            }
	            iCur = parseInt(iCur);                          // 转换成整形，待计算
	
	            var iSpeed = (attrs[attr] - iCur) / 8;          // 缓冲运动计算每次速度
	            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	
	            if (iCur !== attrs[attr]) {
	                bStop = false;
	                if (attr === 'opacity') {
	                    iCur += iSpeed;
	                    elem.style.filter = 'alpha(opacity:'+ iCur +')';
	                    elem.style.opacity = iCur / 100;
	                }else {
	                    elem.style[attr] = iCur + iSpeed + 'px';
	                } 
	            }
	        }
	        if (bStop) {            // 所有属性值已达到给定的目标值
	            clearInterval(elem.timer);
	            callback && callback();
	        };
	    }, 30);
	}
	
	window.onload = function() {
	    var oBtn = document.getElementById('btn');
	    var oDiv = document.getElementById('div1');
	
	    oBtn.onclick = function() {
	        animate(oDiv, {width: 500, height: 600, opacity: 100});
	    };
	
	}

