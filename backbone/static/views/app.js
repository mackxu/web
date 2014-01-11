define(['jquery', 'underscore', 'backbone', 'text!tpl/test'], function($, _, Backbone, testTmp) {
    return Backbone.View.extend({
        initialize: function() {
            var tpl = testTmp({aa: '123', bb: "zhangsan", cc: ' lisi'});
            $body.append(tpl);
        }
    });
});