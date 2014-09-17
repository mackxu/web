define(['sortHelper'], function(helper) {

	var mergeArray = function(arr1, arr2) {
			// 按序合并arr1、arr2
			var temp = [];
			while (arr1.length && arr2.length) {
				temp.push(arr1[0] <= arr2[0] ? arr1.shift() : arr2.shift());
			}
			arr1.length && helper.pushArray(temp, arr1);
			arr2.length && helper.pushArray(temp, arr2);

			return temp;
		}
		, sort = function(arr) {
			var len = arr.length;
			if (len <= 1) return arr;			// 结束递归的条件
			var m = len / 2 | 0
				, aside = arr.splice(0, m)		// 把arr一分为二
				, bside = arr
				;
			aside = sort(aside);				// 对左半边归并
			bside = sort(bside);				// 对右半边归并
			return mergeArray(aside, bside);	// 把左右有序数组归并, 并返回
		}
		;
	function MergeSort(arr) {
		this.arr = arr;
	}
	MergeSort.prototype = {
		exec: function() {
			return sort(this.arr);
		}
	};
	return MergeSort;
});