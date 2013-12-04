var Todos = Backbone.Collection.extend({
	model: Todo,
	localStorage: new Backbone.LocalStorage('todo'),
	comparator: 'order',
	done: function() {},
	remaining: function() {}
});