App.module('AboutApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	Show.Content = Marionette.ItemView.extend({
		template: "#about-template"
	});
});