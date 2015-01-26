App.module('AboutApp.Show', function(Show, App, Backbone, Marionette, $, _) {
	Show.Controller = {
		showAbout: function() {
			var aboutView = new Show.Content();
			App.mainRegion.show(aboutView);
		}
	};
});