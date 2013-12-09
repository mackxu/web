var TodoItem = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#todoItem-tmpl').html()),
	events: {
		'click .todo-item-toggle': 'toggleDone',
		'click .todo-item-destroy': 'clear'
	},
	initialize: function() {
		var model = this.model;
		model || console.log('实例化时需要参数：model');

		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$el.toggleClass('done', this.model.get('done'));

		this.$input = this.$('.edit');
		return this;
	},
	toggleDone: function() {
		this.model.toggle();

	},
	clear: function() {
		this.model.destroy();
	}
});