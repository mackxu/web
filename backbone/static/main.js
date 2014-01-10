require.config({
    paths: {
        'jquery': 'libs/jquery',
        'underscore': 'libs/underscore',
        'backbone': 'libs/backbone',
        'text': 'libs/require_text'
    }
});

require(['views/app'], function(AppView) {
    window.$body = $('#body');
    new AppView;
    Backbone.history.start();
});