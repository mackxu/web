	
	var http = require('http');
	var url = require('url');

	function start(route) {
		http.createServer(function(request, response) {
			console.log('http 请求！');
			var pathname = url.parse(request.url).pathname;
			route && route(pathname);
			response.writeHead(200, {'Content-Type': 'text/plain'});
			response.write('good work');
			// response.end('good work2');
			response.end();
		}).listen(8080);
	}

	exports.start = start;