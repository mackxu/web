require.config({
    // baseUrl: './',
    paths: {
        'jquery': 'vendor/jquery/jquery',
        'underscore': 'vendor/underscore-amd/underscore',
        'backbone': 'vendor/backbone-amd/backbone',
        'text': 'vendor/text/crab-text'
    }
});

require(['views/app'], function(AppView) {
    new AppView;
});