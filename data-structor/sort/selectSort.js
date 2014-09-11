define(['sortHelper'], function(helper) {

    function SelectSort(arr) {
        this.arr = arr;
        this.len = arr.length;
    }
    SelectSort.prototype.handle = function() {
        for (var i = 0; i < this.len - 1; i++) {
            var min = i;                                // 假定最小值下标为i
            for (var j = i + 1; j < this.len; j++) {
                if (this.arr[min] > this.arr[j]) {      // 选出最小值
                    min = j;
                }
            }
            if (min !== i) {                            // 如果选出了i...n中的最小值
                helper.swap(i, min, this.arr);          // 则，与i交换位置
            }
        }
    }
    return SelectSort;
});