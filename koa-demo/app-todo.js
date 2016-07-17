
var logger = require('koa-logger');
var views = require('co-views');
var parse = require('co-body');
var router = require('koa-router')();
var koa = require('koa');

var app = koa();

// data store
var todos = [{
    id: 0,
    name: 'test todo',
    createdOn: 0,
    updatedOn: 0,
}];

app.use(logger());
app.use(router.routes()).use(router.allowedMethods());

// router middleware

router.get('/', list);
router.get('/todo/new', add);
router.get('/todo/:id', show);
router.get('/todo/del/:id', remove);
router.get('/todo/edit/:id', edit);

router.post('/todo/create', create);
router.post('/todo/update', update);



// Specifying Swig view engine
var render = views(__dirname + '/views', { map: { html: 'swig' } });

/**
 * Todo item List.
 */
function *list() {
    this.body = yield render('index', { todos: todos });
}

/**
 * Form for create new todo item.
 */
function *add() {
    this.body = yield render('new');
}

/**
 * Show details of a todo item.
 */
function *show() {

    var todo = todos[this.params.id];
    if(!todo) throw404(this);

    // 格式化时间
    todo = Object.assign({}, todo, {
        createdOn: (new Date(todo.createdOn)).toLocaleString(),
        updatedOn: (new Date(todo.updatedOn)).toLocaleString(),
    });

    this.body = yield render('show', { todo });
}


/**
 * Remove a todo item
 */

function *remove(id) {
    var todo = todos[this.params.id];
    if(!todo) throw404(this);

    todos.splice(id, 1);

    todos.forEach((todo, i) => todo.id = i);

    this.redirect('/');
}

/**
 * Form for edit a todo items.
 */
function *edit() {
    var todo = todos[this.params.id];
    if(!todo) throw404(this);

    this.body = yield render('edit', { todo });
}

/**
 * Create a todo item into the data store.
 */
function *create() {
    var todo = yield parse(this);

    todo.createdOn = +new Date();
    todo.updatedOn = +new Date();

    var id = todos.push(todo);
    todo.id = id - 1;

    this.redirect('/');
}

/**
 * Update an existing todo item.
 */
function *update() {
    var todo = yield parse(this);

    Object.assign(todos[todo.id], {
        name: todo.name,
        desc: todo.desc,
        updatedOn: (+new Date()),
    });

    this.redirect('/');

}

function throw404(context) {
    context.throw('404', 'invalid todo id');
}


app.listen(3000);
console.log('listening on port 3000');