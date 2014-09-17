// 快速排序是冒泡排序的一种改进
define(['sortHelper', 'insertSort'], function(helper, InsertSort) {

	var qSort = function(arr, low, high) {
			if (low < high) {			// 循环结束条件, 直到数组中只有一个元素为止
				var pivotLoc = partition2(arr, low, high);		// 将arr[low..high]一分为二
				qSort(arr, low, pivotLoc - 1);					// 对低子表递归排序
				qSort(arr, pivotLoc + 1, high);					// 对高子表递归排序
			}
		}
		, qSort2 = function(arr, low, high) {
			// 优化小数组时的排序方案. 如果数组非常小, 直接插入排序比快速排序更好

		}
		, qSort3 = function(arr, low, high) {
			// 对尾递归优化
			while(low < high) {
				var pivotKey = partition2(arr, low, high);
				qSort3(arr, low, pivotKey - 1);					// 对低子表递归排序
				low = pivotKey + 1;								// 尾递归优化
			}
		}
		, qSort4 = function(arr) {
			var len = arr.length;
			if (len <= 1) return arr;	// 递归结束条件
			// 选取基准值
			var pivotKey = arr.splice(len / 2 | 0, 1)[0]
				, leftArr = []
				, rightArr = []
				;
			// 把剩下len-1个元素一分为二
			for (var i = 0; i < len - 1; i++) {
				arr[i] > pivotKey ? rightArr.push(arr[i]) : leftArr.push(arr[i]);
			}
			return qSort4(leftArr).concat(pivotKey, qSort4(rightArr));

		}
		, partition = function(arr, low, high) {
			var pivotKey = arr[low];	// 设置基准值, 并腾出位置待小于它的值替换
			while (low < high) {
				while (low < high && arr[high] >= pivotKey) {
					high--;
				}
				arr[low] = arr[high];	// 放在左边腾出的位置
				while (low < high && arr[low] <= pivotKey) {
					low++;
				}
				arr[high] = arr[low];	// 放在右边腾出的位置
			}
			arr[low] = pivotKey;		// 把基准值插入到中间
			return low;
		}
		, partition2 = function(arr, low, high) {
			// 三数取中法, 确定基准值.
			var m = low + (high - low) / 2 | 0;
			// 交换三值的位置, 保证 m < low < high
			arr[low] > arr[high] && helper.swap(low, high, arr);
			arr[m] > arr[high] && helper.swap(m, high, arr);
			arr[m] > arr[low] && helper.swap(m, low, arr);

			var pivotKey = arr[low];	// 设置基准值
			while (low < high) {
				while (low < high && arr[high] >= pivotKey) {
					high--;
				}
				arr[low] = arr[high]	// 把小数放在虚位以待的地方
				while (low < high && arr[low] <= pivotKey) {
					low++;
				}
				arr[high] = arr[low];	// 把大数放在上面替换腾出的位置
			}
			arr[low] = pivotKey;
			return low;
		}
		;

	function QuickSort(arr) {
		this.arr = arr;
		this.len = arr.length;
	}
	QuickSort.prototype = {
		qSortRecursion: function() {
			// 递归实现算法
			qSort3(this.arr, 0, this.len - 1);
		},
		qSortNoRecursion: function() {
			// 非递归实现算法
			if (this.len === 1) return;
			var s = [];					// 按顺序存放开始和结束下标
			s.push(0, this.len - 1);
			while (s.length) {
				var high = s.pop()
					, low = s.pop()
					// , pivotKey = partition2(this.arr, low, high)
					;
				// if (low < pivotKey - 1) s.push(low, pivotKey -1);
				// if (high > pivotKey + 1) s.push(pivotKey + 1, high);
				if (low < high) {
					var pivotKey = partition2(this.arr, low, high);
					s.push(low, pivotKey -1);
					s.push(pivotKey + 1, high);
				}
			}
		},
		returnNewArr: function() {
			// 返回新的有序数组
			return qSort4(this.arr);
		}
	}
	return QuickSort;
});