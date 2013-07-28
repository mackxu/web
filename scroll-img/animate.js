// 返回指定属性的属性值
// 注意获得值带有单位(px)
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
            if (attr === 'opacity') {                       // 如果是透明度，应单独对待
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
        if (bStop) {                                        // 所有属性全部达到指定的目标值
            clearInterval(elem.timer);                      // 停止动画
            callback && callback();                         // 执行回调函数
        };
    }, 30);
}