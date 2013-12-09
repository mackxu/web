var TodoItem = Backbone.View.extend({
	tagName: 'li',
	template: _.template($('#todoItem-tmpl').html()),
	events: {
		'click .todo-item-toggle': 'toggleDone',
		'click .todo-item-destroy': 'clear',
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},
	initialize: function() {
		var model = this.model;
		model || console.log('实例化时需要参数：model');

		this.listenTo(model, 'change', this.render);
		// 当model被销毁时, remove()会停止该视图监听和移除DOM结构
		this.listenTo(model, 'destroy', this.remove);			
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
		this.model.destroy();				// delegating an HTTP DELETE request to Backbone.sync
	},
	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},
	updateOnEnter: function(event) {
		event.which === 13 && this.close();
	},
	close: function() {
		var value = $.trim(this.$input.val());
		value && this.model.save({ title: value }, { patch: true });
		this.$el.removeClass('editing');
	}
});