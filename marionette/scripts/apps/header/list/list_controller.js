App.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _) {
	List.Controller = {
		listHeader: function() {
			var links = App.request('header:entities');

			var headers = new List.Headers({
				collection: links
			});

			App.headerRegion.show(headers);
		},
		setActiveHeader: function(headerUrl) {
			var links = App.request("header:entities"); 
			var headerToSelect = links.find(function(header){
				return header.get("url") === headerUrl; 
			});
    		headerToSelect.select();
    		links.trigger("reset");
		}
	};
});