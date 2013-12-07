var Todos = Backbone.Collection.extend({
	model: TodoMdl,
	localStorage: new Backbone.LocalStorage('todo'),
	comparator: 'title',
	done: function() {},
	remaining: function() {}
});

var todos = new Todos([
	{ id: 1, title: 'zzzzzz', completed: false }, 
	{ id: 2, title: 'wwwwww', completed: true },
	{ id: 5, title: 'bbbbbb', completed: false },
	{ id: 8, title: 'aaaaaa', completed: true }
]);


var titles = todos.chain().filter(function(todo) {
	return todo.get('completed') === true;
}).map(function(todo) {
	return todo.get('title');
}).value();
console.log(titles);
