var TodoMdl = Backbone.Model.extend({
	defaults: {
		title: '',
		done: false
	},
	// parse: function(response) {
	// 	// console.log(response.id);
	// 	return response;
	// },
	toggle: function() {
		var self = this;
		// this.save({done: !this.get('done')}, { patch: true });
		this.save({done: !this.get('done')});
	}
});