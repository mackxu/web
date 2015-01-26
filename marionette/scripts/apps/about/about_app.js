App.module('AboutApp', function(AboutApp, App, Backbone, Marionette, $, _) {
	AboutApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			'about': 'showAbout'
		}
	});

	var API = {
		showAbout: function() {
			AboutApp.Show.Controller.showAbout();
		}
	};

	App.on('about:show', function() {
		this.navigate('about');
		API.showAbout();
	});

	App.addInitializer(function() {
		new AboutApp.Router({
			controller: API
		});
	});
});