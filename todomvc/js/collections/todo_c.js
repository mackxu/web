var Todos = Backbone.Collection.extend({
	model: TodoMdl,
	localStorage: new Backbone.LocalStorage('todo'),
	comparator: 'order',
	done: function() {},
	remaining: function() {}
});