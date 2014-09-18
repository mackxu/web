define(function() {

	function ShellSort(arr) {
		this.arr = arr;
		this.len = arr.length;
	}
	ShellSort.prototype = {
		exec: function() {
			var arr = this.arr
				, len = this.len
                , maxGap = 1 + (len - 1) / 3 | 0
				, gap = 0
				;
			while (gap <= maxGap) {						// 计算出第一次步长
				gap = gap * 3 + 1;
			}
			while (gap > 0) {
				for (var i = gap; i < len; i++) {		// 跳跃式分组排序
					var temp = arr[i];
					for(var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
						arr[j + gap] = arr[j];
					}
					arr[j + gap] = temp;				// 找到有序位置插入
				}
				gap = (gap - 1) / 3;				    // 计算下一个步长
			}
		}
	};

	return ShellSort;
});