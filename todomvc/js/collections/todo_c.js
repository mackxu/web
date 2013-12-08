var Todos = Backbone.Collection.extend({
	model: TodoMdl,
	localStorage: new Backbone.LocalStorage('todo'),
	comparator: 'order',
	// parse: function(response) {
	// 	// console.log(response);
	// 	// 目的是只打印出指定条件的数组
	// 	// 可以用此来返回特定加工后的数据
	// 	// return _.where(response, { title: 'dd' });
	// 	return response;
	// },
	done: function() {
		return this.where({ done: true });
	},
	remaining: function() {
		return this.where({ done: false });
	},
	nextOrder: function() {
		if(!this.length) return 1;
		return this.last().get('order') + 1;
	}
});
