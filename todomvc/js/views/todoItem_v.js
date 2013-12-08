var TodoItem = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#todoItem-tmpl').html()),
	initializtion: function() {},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.$input = this.$('.edit');
		return this;
	}
});