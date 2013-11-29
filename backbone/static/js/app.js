var App = Backbone.View.extend({
	tagName: 'h3',
	render: function() {
		this.$el.html('good work');
		return this;
	}
});