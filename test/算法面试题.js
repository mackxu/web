解释下 Prototypal Inheritance 与 Classical Inheritance 的区别

1. 找出整型数组中乘积最大的三个数
给定一个包含整数的无序数组，要求找出乘积最大的三个数。

排序后, 比较最大三个数乘积和最小两个数与最大数的乘积


2. 寻找连续数组中的缺失数
给定某无序数组，其包含了 n 个连续数字中的 n – 1 个，已知上下边界，要求以O(n)的复杂度找出缺失的数字。

3. 数组去重
给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组。

// 未判断NaN
function unique(arr) {
    var n = [];
    for(var i = 0, len = arr.length; i < len; i++) {
        if(n.indexOf(arr[i]) === -1) {
            n.push(arr[i]);
        }
    }
    return n;
}
// 简版 未判断NaN
function unique(arr) {
    return arr.filter(function(item, index) {
        return arr.indexOf(item) === index;
    });
}

4. 数组中元素最大差值计算
给定某无序数组，求取任意两个元素之间的最大差值，注意，这里要求差值计算中较小的元素下标必须小于较大元素的下标。
譬如[7, 8, 4, 9, 9, 15, 3, 1, 10]这个数组的计算值是 11( 15 – 4 ) 而不是 14(15 – 1)，
因为 15 的下标小于 1。

function findLargestDifference(arr) {
    var minVal = arr[0];
    var maxDiffVal = 0;
    var len = arr.length;
    if(len === 0) return maxDiffVal;

    for(var i = 1; i < len; i++) {
        if((arr[i] > minVal)) {
            if(arr[i] - minVal > maxDiffVal) {
                maxDiffVal = arr[i] - minVal;   // 获取最大差值
            }
        }else {
            minVal = arr[i];                    // 获取最小值
        }
    }
    return maxDiffVal;
}

5. 数组中元素乘积
给定某无序数组，要求返回新数组 output ，其中 output[i] 为原数组中除了下标为 i 的元素之外的元素乘积，要求以 O(n) 复杂度实现：

6. 数组交集
给定两个数组，要求求出两个数组的交集，注意，交集中的元素应该是唯一的。

1. 颠倒字符串
2. 回文字符串
判断某个字符串是否为回文字符串，譬如racecar与race car都是回文字符串

3. 使用两个栈实现入队与出队

4. 判断大括号是否闭合
创建一个函数来判断给定的表达式中的大括号是否闭合
var expression = '{{{}{}}{{}}}';
var expression = '{{{}{}{{}}}';

function isBalanced(expression) {
    var checkStr = expression;
    var stack = [];         // 可以用数值记录

    if(checkStr.length === 0) return true;
    for(var i = 0, len = checkStr.length; i < len; i++) {
        var c = checkStr[i];
        if(c === '{') {
            stack.push(c);
        }else if(c !== '}') {
            stack.pop();
        }
    }
    return stack.length == 0
}




二进制转换
1. 通过某个递归函数将输入的数字转化为二进制字符串
function decimalToBinary(num) {
    if(num < 1) return '';
    if(num % 2) {
        return decimalToBinary((num - 1) / 2) + 1;
    } else {
        return decimalToBinary(num / 2) + 0;
    }
}

2. 二分搜索(查找)

function binarySearch(arr, value, leftIndex, rightIndex) {
    if(leftIndex > rightIndex) return -1;
    var midIndex = Math.floor((rightIndex - leftIndex) / 2);
    if(value = arr[midIndex]) {
        return midIndex;
    }else if(value > arr[midIndex]) {
        return binarySearch(arr, value, midIndex + 1, rightIndex);
    }else {
        return binarySearch(arr, value, leftIndex, midIndex -1);
    }
}





