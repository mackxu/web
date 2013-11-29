<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Welcome to CodeIgniter</title>

	<style type="text/css">

	::selection{ background-color: #E13300; color: white; }
	::moz-selection{ background-color: #E13300; color: white; }
	::webkit-selection{ background-color: #E13300; color: white; }

	body { background-color: #fff; margin: 40px; font: 13px/20px normal Helvetica, Arial, sans-serif; color: #4F5155; }

	h1 {color: #444;background-color: transparent;border-bottom: 1px solid #D0D0D0;ont-size: 19px;ont-weight: normal;margin: 0 0 14px 0;padding: 14px 15px 10px 15px; }
	#body{margin: 0 15px 0 15px;}
	
	p.footer{text-align: right;font-size: 11px;border-top: 1px solid #D0D0D0;line-height: 32px;padding: 0 10px 0 10px;margin: 20px 0 0 0;}
	
	#container{ margin: 10px;border: 1px solid #D0D0D0;-webkit-box-shadow: 0 0 8px #D0D0D0; }
	</style>
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
<script src="static/js/app.js"></script>
<script>
	$('#body').append(new App().render().el);
</script>

</body>
</html>