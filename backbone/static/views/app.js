define(['jquery', 'underscore', 'backbone', 'text!tpl/test'], function($, _, Backbone, testTmp) {
    
    var IP = 'http://localhost';
    var Todo = Backbone.Model.extend({
        defaults: {
            title: '',
            done: false
        }
    });

    var Todos = Backbone.Collection.extend({
        model: Todo,
        url: IP + '/todos.php',
        initialize: function() {
            this.fetch({data: {done: 0, p: 1}, reset: true});
        }
    });

    return Backbone.View.extend({
        initialize: function() {
            Backbone.emulateHTTP = true;
            
            $body.append(testTmp({
                aa: '<script>alert(123)</script>', 
                bb: 123, 
                cc: 456, 
                friends: [{
                    nickname: 'zhangsan'
                }, {
                    nickname: 'lisi'
                }]
            }));

            // this.collection = new Todos();
            // this.listenTo(this.collection, 'reset', this.addAll);
        },
        render: function() {

        },
        addAll: function() {
            $body.html('');
            console.log(this.collection.toJSON());
            this.collection.each(this.addOne, this);
        },
        addOne: function(todo) {
            // console.log(todo.toJSON());
        }
    });
});