var fibonacci = function(n) {
	if(typeof n !== 'number') {
		throw new Error('n should be a Number');
	}
	if(n < 0) {
		throw new Error('n should >= 0');
	}
	if(n > 10) {
		throw new Error('n should <= 10');
	}
	if(n === 0) return 0;
	if(n === 1) return 1;

	return fibonacci(n - 1) + fibonacci(n - 2);
};

exports.fibonacci = fibonacci;

if (require.main === module) {
	// 如果直接执行该文件，则执行此处
	// 如果该文件被其它文件require,则此处不会执行
	var arg2 = Number(process.argv[2]);
	console.log('fibonacci('+ arg2 +') is', fibonacci(arg2));
}