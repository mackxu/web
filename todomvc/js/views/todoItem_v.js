var TodoItem = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#todoItem-tmpl').html()),
	initializtion: function() {}
});