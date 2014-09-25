require(['permutation'], function(Permutation) {
	'use strict';
	var str = 'abc3'
		, p = new Permutation(str)
	;
	console.log(p.exec());
});