var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/', function(req, res) {
	// 用superagent去抓取网页内容
	var url = 'http://cnodejs.org/';
	superagent.get(url).end(function(err, sres) {
		if(err) {
			return next(err);
		}

		// sres.text里面存储网页的html内容
		// cheerio.load: 服务器端的jquery, 解析字符串
		var $ = cheerio.load(sres.text);
		var items = [];

		$('#topic_list .topic_title').each(function(idx, el) {
			var $this = $(el);
			items.push({
				title: $this.attr('title'),
				href: $this.attr('href'),
			});
		});

		res.send(items);
	});
});

app.listen(3000, function() {
	console.log('app is listening at port 3000');
});