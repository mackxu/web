App.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _) {
	
	List.Header = Marionette.ItemView.extend({
		template: '#header-link',
		tagName: 'li',
		onRender: function() {
			if(this.model.selected) {
				this.$el.addClass('active');
			}
		}
	});

	List.Headers = Marionette.CompositeView.extend({
		template: '#header-template',
		tagName: 'nav',
		className: "navbar navbar-inverse navbar-fixed-top",
		childView: List.Header,
		childViewContainer: 'ul'
	});
	
});