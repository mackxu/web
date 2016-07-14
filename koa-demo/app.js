
var logger = require('koa-logger');
var views = require('co-views');
var parse = require('co-body');
var router = require('koa-router')();
var koa = require('koa');

var app = koa();

// data store
var todos = [];

app.use(logger());

// router middleware

router.get('/', list);
router.get('/todo/new', add);
router.get('/todo/:id', show);
router.get('/todo/del/:id', remove);
router.get('/todo/edit/:id', edit);

router.post('/todo/create', create);
router.post('/todo/update', update);

app.use(router.routes()).use(router.allowedMethods());

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

}


/**
 * Remove a todo item
 */

function *remove() {

}

/**
 * Form for edit a todo items.
 */
function *edit() {

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

}



app.listen(3000);
console.log('listening on port 3000');