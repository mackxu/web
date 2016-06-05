var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var async = require('async');
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

		async.mapLimit(topicUrls, 5, function(topicUrl, callback) {

			superagent.get(topicUrl).end(function(err, res) {
				if(err) return '';
				console.log('fetch ' + topicUrl + ' successful!');
				var $ = cheerio.load(res.text);
				var title = $('.topic_full_title').text().replace(/\s+/g, '');
				callback(null, {
					title: title,
					href: topicUrl,
					common1: $('.reply_content').eq(0).text().trim(),
				});
			});

		}, function(err, result) {
			console.log('final: ');
			res.send(result);
			// console.log(result);
		});
	});
});

app.listen(3000, function() {
	console.log('app is listening at port 3000');
});