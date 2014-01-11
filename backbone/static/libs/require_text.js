define({
    load: function(name, req, onload, config) {
        // 加载js模板
        req([config.baseUrl+ '../' + name.replace(/^tpl\//, 'build/')], function (templatejs) {
            onload(templatejs);
        });
    }
});