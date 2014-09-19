define(function() {
    var binaryRecur = function(arr, low, high, key) {
        var m = (high + low) / 2 | 0;
        if (low > high) return false;                       // 没有查找到返回false
        if (arr[m] === key) {
            return m;                                       // 查找到了,返回对应下标
        }else if (arr[m] < key) {                           // 如果key大于中间记录, 
            return binaryRecur(arr, m + 1, high, key);      // 右半边寻找key
        }else {
            return binaryRecur(arr, low, m - 1, key);       // 否则在左半边查找key
        }
    }
    function StaticSearch(arr) {
        this.arr = arr;
        this.len = arr.length;
    }
    StaticSearch.prototype = {
        sequential: function(key) {
            var arr = this.arr;
            for (var i = this.len; --i; ) {
                if (arr[i] === key) {
                    return i;
                }
            }
            return false;
        },
        sequential2: function(key) {
            // 对顺序查找的优化
            var arr = this.arr
                , i = 0
                ;
            arr[this.len] = key;

            while(arr[i] !== key) {
                i++;
            }
            if (i === this.len) return false;
            return i;
        },
        binary: function(key) {
            // 在有序表中，取中间记录作为比较对象，若给定值与中间记录的关键字相等，则查找成功
            // 若给定值小于中间记录的关键字，则在中间记录的左半区继续查找
            // 若给定值大于中间记录的关键字，则在中间记录的右半区继续查找
            // 不断重复上述过程, 完成查找
            // 这种搜索算法每一次比较都使搜索范围缩小一半
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
        binaryRecur: function(key) {
            // 递归实现二分查询
            return binaryRecur(this.arr, 0, this.len - 1, key);
        },
        interpolation: function(key) {
            // 插值查找是根据要查找的关键字与查找表中最大最小关键字比较后的查找方法
            var arr = this.arr
                , low = 0
                , high = this.len - 1
                ;
            while(low <= high) {
                var m = low + (high - low) * (key - arr[low]) / (arr[high] - arr[low]) | 0;
                if (key === arr[m]) return m;
                if (key < arr[m]) {
                    high = m - 1;
                }else {
                    low = m + 1;
                }
            }
            return false;
        }

    };
    return StaticSearch;
});