var Todos = Backbone.Collection.extend({
	model: TodoMdl,
	// localStorage: new Backbone.LocalStorage('todo'),
	comparator: 'title',
	done: function() {},
	remaining: function() {}
});

var todos = new Todos([
	{ id: 1, title: 'zzzzzz', completed: false }, 
	{ id: 2, title: 'wwwwww', completed: true }
]);

todos.on({
	'add': function(model) {
		console.log('Added: ' + model.get('title'));
	},
	'remove': function(model) {
		console.log('removed: ' + model.get('title'));
	},
	'change': function(model) {
		console.log('completed: ' + model.get('title'));
	}
});

todos.set({ id: 2, title: 'aaaaaaa', completed: true });

console.dir(todos.toJSON());