define(function() {
	'use strict';
	// 数组全排列
	var fullPermutation = function(str, low, high) {
		if(low + 1 >= high) {				// 递归到只剩下两个长度的字符串时
			// 返回全排列后的数组
			return [str[low] + str[high], str[high] + str[low]];
		}
		return fullInsertChar(str[low], fullPermutation(str, low + 1, high));
	};
	var fullInsertChar = function(sChar, aSet) {
		// 把sChar插入到aSet的元素的任何位置
		var collection = [];
		for (var i = 0, len = aSet.length; i < len; i++) {
			var s = aSet[i], sLen = s.length;
			for (var j = 0; j < sLen + 1; j++) {
				// sChar可以放到aSet[i]中任何位置
				collection.push(s.slice(0, j) + sChar + s.slice(j));
			}
			
		}
		return collection;
	};
	function Permutation(data) {
		this.data = data;
		this.len = data.length;
	}
	Permutation.prototype = {
		exec: function() {
			// 返回一个存储全排列字符串的数组
			return fullPermutation(this.data, 0, this.len - 1);
		}
	};
	return Permutation;
});