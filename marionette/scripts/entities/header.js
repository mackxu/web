App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
	
	Entities.Header = Backbone.Model.extend({
		initialize: function() {
			var selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);
		}
	});

	Entities.HeaderCollection = Backbone.Collection.extend({
		model: Entities.Header,
		initialize: function() {
			var singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);
		}
	});

	// 初始化数据直接在这里, 不行。
	// 
	var initializeHeaders = function() {
		Entities.headers = new Entities.HeaderCollection([
			{ id: 1, name: 'Contacts', url: 'contacts' },
			{ id: 2, name: 'About', url: 'about' }
		]);
	};

	var API = {
		getHeaders: function() {
			if(Entities.headers === undefined) {
				initializeHeaders();
			}
			return Entities.headers;
		}
	};

	App.reqres.setHandler('header:entities', function() {
		return API.getHeaders();
	});


});