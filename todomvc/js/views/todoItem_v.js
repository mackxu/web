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

		this.listenTo(model, 'change', this.render);
		this.listenTo(model, 'destroy', this.remove);			// 当model被销毁时, remove()会停止该视图监听和移除DOM结构
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
		// triggers a "destroy" event on the model
		// 包含它的集合会执行remove()
		this.model.destroy();				// delegating an HTTP DELETE request to Backbone.sync
	}
});