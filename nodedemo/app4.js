var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');

var cnodeUrl = 'http://cnodejs.org/';


var app = express();

app.get('/', function(req, res) {
	// 用superagent去抓取网页内容
	superagent.get(cnodeUrl).end(function(err, sres) {
		if(err) {
			return next(err);
		}

		var topicUrls = [];					// 存放主页标题url

		var $ = cheerio.load(sres.text);
		$('#topic_list .topic_title').each(function() {
			var href = url.resolve(cnodeUrl, $(this).attr('href'));
			topicUrls.push(href);
		});

		var ep = new eventproxy();			// == promise.when()
		ep.after('topicHtml', topicUrls.length, function(topics) {
			topics.map(function(topic) {
				var topicUrl = topic[0];
				var content = topic[1];

				if(!content) return '';

				var $ = cheerio.load(content);
				var title = $('.topic_full_title').text().replace(/\s+/g, '');
				// return ({
				// 	title: title,
				// });

				return title;
			});


			console.log(topics);
			res.send('final');
		});

		// 抓取每个主题页面
		// 并自定义topicHtml事件
		topicUrls.forEach(function(topicUrl) {
			superagent.get(topicUrl).end(function(err, res) {
				if(err) {
					console.log('fetch ' + topicUrl + ' fail!');
					return ep.emit('topicHtml', [topicUrl, '']);
				}
				console.log('fetch ' + topicUrl + ' successful!');
				ep.emit('topicHtml', [topicUrl, res.text]);
			})
		});
	});
});

app.listen(3000, function() {
	console.log('app is listening at port 3000');
});