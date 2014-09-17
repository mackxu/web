define(['sortHelper'], function(helper) {

    function InsertSort(arr) {
        this.arr = arr;
        this.len = arr.length;
    }

    InsertSort.prototype.handle = function() {
        var arr = this.arr;
        for (var i = 1; i < this.len; i++) {
            if (arr[i] < arr[i - 1]) {                      // 目标元素可以插在有序列当中
                var temp = arr[i];                          // 取出目标元素, 腾出第i个位置
                arr[i] = arr[i - 1];                        // i-1后移一位
                // 当j = -1时, 循环也会结束,此时待插入位置的下标为0
                for (var j = i - 2; arr[j] > temp; j--) {
                    arr[j + 1] = arr[j];                    // 如果大于目标元素, 向后移动位置         
                }
                arr[j + 1] = temp;                          // 把目标元素插入有序的位置中
            }
        }
    };

    InsertSort.prototype.bInsert = function() {
        // 折半插入排序
        var arr = this.arr;
        for (var i = 1; i < this.len; i++) {
            var temp = arr[i]
                , low = 1
                , high = i - 1;
            // 循环结束条件: low > high
            while (low <= high) {
                var m = (low + high) / 2 | 0;               // 折半
                if (temp < arr[m]) {
                    high = m - 1;                           // 插入点在低半区
                }else {
                    low = m + 1;                            // 插入点在高半区
                }
            }
            for (var j = i - 1; j >= high + 1; j--) {
                arr[j + 1] = arr[j];
            }
            arr[high + 1] = temp;
        }
    };
    return InsertSort;    
});