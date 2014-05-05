var server = require('./server');
var router = require('./router');
// 开启HTTP服务器
server.start(router.route);