var Todos = Backbone.Collection.extend({
	// model: TodoMdl,
	// localStorage: new Backbone.LocalStorage('todo'),
	comparator: 'title',
	done: function() {},
	remaining: function() {}
});

var todos = new Backbone.Collection([{ id: 1, title: 'qqqqqq', completed: false }, { id: 2, title: 'wwwwww', completed: true }]);

// todos.add({ id: 1, title: 'qqqqqq', completed: false });
// todos.add({ id: 2, title: 'wwwwww', completed: true });

// todos.add([{ id: 1, title: 'qqqqqq', completed: false }, { id: 2, title: 'wwwwww', completed: true }]);

todos.on('add', function(model) {
	console.log(model);
});
todos.add({ id: 3, title: 'eeeeeee', completed: false });

console.log(todos.toJSON());