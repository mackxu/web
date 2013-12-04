<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to Backbone</title>
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<link rel="stylesheet" type="text/css" href="static/css/base.css">
	<link rel="stylesheet" type="text/css" href="static/css/api.css">
	<script type="text/javascript" src="static/js/libs/underscore.js"></script>
	<script type="text/javascript" src="static/js/libs/zepto.js"></script>
	<script type="text/javascript" src="static/js/libs/backbone.js"></script>
</head>
<body>

<div id="container">
	<h1>Welcome to Backbone!</h1>

	<div id="body">
		
	</div>

	<p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds</p>
</div>
<script type="text/template" id="imageItem">
	<div><a href="#view/<%= id %>"><img src="static/<%= src %>"></a></div>
	<p><%= intro %></p>
</script>
<script src="static/js/app.js"></script>
<script>
	window.$body = $('#body');
	// 开启Backbone之旅
	new App();
	Backbone.history.start();
</script>

</body>
</html>