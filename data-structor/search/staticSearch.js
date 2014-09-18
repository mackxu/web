define(function() {
    
    function StaticSearch(arr) {
        this.arr = arr;
    }
    StaticSearch.prototype = {
        sequential: function() {

        },
        sequential2: function() {

        },
        binary: function(key) {
            // 在有序表中，取中间记录作为比较对象，若给定值与中间记录的关键字相等，则查找成功
            // 若给定值小于中间记录的关键字，则在中间记录的左半区继续查找
            // 若给定值大于中间记录的关键字，则在中间记录的右半区继续查找
            // 不断重复上述过程, 完成查找
            var arr = this.arr
                , low = 0
                , high = arr.length - 1
                ;
            while(low <= high) {
                var mid = (low + high) / 2 | 0;
                if (key === arr[mid]) return mid;
                if (key < arr[mid]) {
                    high = mid - 1;
                }else {
                    low = mid + 1;
                }
            }
            return false;

        },
        interpolation: function() {
            // 插值查找是根据要查找的关键字与查找表中最大最小关键字比较后的查找方法
            
        }

    };
    return StaticSearch;
});