
define(['backbone', 'underscore', 'text!defaultView.html'], function(Backbone, _, defaultView) {
    
    return Backbone.View.extend({
        // template: _.template(defaultView),
        initialize: function() {
            console.log(_.template(defaultView, {"username": "mackxu"}));
            document.body.innerHTML = _.template(defaultView, {"username": "mackxu"});
        }
    });

});