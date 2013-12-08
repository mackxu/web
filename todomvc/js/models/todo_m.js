var TodoMdl = Backbone.Model.extend({
	defaults: {
		title: '',
		done: false
	},
	parse: function(response) {
		console.log(response.id);
		return response;
	}
});