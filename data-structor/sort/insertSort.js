define(['sortHelper'], function(helper) {

    function InsertSort(arr) {
        this.arr = arr;
        this.len = arr.length;
    }

    InsertSort.prototype.handle = function() {
        for (var i = 1; i < this.len; i++) {
            if (this.arr[i] < this.arr[i - 1]) {                // i的左侧是有序序列
                var temp = this.arr[i];                         // 取出目标元素, 腾出第i个位置
                // 当j = -1时, 循环也会结束,此时待插入位置的下标为0
                for (var j = i - 1; this.arr[j] > temp; j--) {
                    this.arr[j + 1] = this.arr[j];              // 如果大于目标元素, 向后移动位置         
                }
                this.arr[j + 1] = temp;                         // 把目标元素插入有序的位置中
            }
        }
    };

    return InsertSort;    
});