define(['sortHelper'], function(helper) {
    var BubbleSore;
    return BubbleSore = (function() {
        
        function BubbleSore(arr) {
            this.arr = arr;
            this.len = arr.length;
        };
        // 严格意义上说，这个不算标准的冒泡排序算法，
        // 因为它不满足“两两比较相邻记录”
        BubbleSore.prototype.fake = function() {
            for (var i = 0; i < this.len - 1; i++) {
                for (var j = i + 1; j< this.len; j++) {
                    if (this.arr[i] > this.arr[j]) {
                        helper.swap(i, j, this.arr);
                    }
                }
            }
        };
        // 数字如同气泡般慢慢浮到上面
        BubbleSore.prototype.simple = function() {
            for(var i = 1; i < this.len; i++) {                 // 外循环有n-1趟
                for (var j = this.len - 1; j >= 0; j--) {
                    
                    if (this.arr[j + 1] < this.arr[j]) {        // 如果后者小于前者
                        helper.swap(j , j + 1, this.arr);       // 则向前冒泡
                    }
                }
            }
        };
        // 冒泡排序优化
        BubbleSore.prototype.better = function() {
            var swaped = true;                                  // 添加哨兵
            for (var i = 1; i < this.len && swaped; i ++) {     // 如果一趟循环中没有发生交换, 说明表中已经是有序的了         
                swaped = false;
                for (var j = this.len - 1; j >= 0; j--) {
                    if (this.arr[j + 1] < this.arr[j]) {
                        helper.swap(j , j + 1, this.arr);
                        swaped = true;                          // 发生了位置交换
                    }
                }
            }
        };
        return BubbleSore;
    })();

});