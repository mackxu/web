define({
    load: function(name, req, onLoad, config) {
        req([config.baseUrl + 'views/' + name.replace('.html', '.js')], function(template) {
            onLoad(template.template);
        });
    }
});
