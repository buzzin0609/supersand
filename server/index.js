(function() {
	'use strict';

	var express = require('express');
	var app = express();
	var path = require('path');
	var root = __dirname + '/../';
	console.log(root);

	app.use('/public', express.static('../public'));
	app.use('/app', express.static('../app'));

	app.get('/', function(req, res){
		res.sendFile(path.join(root+'/index.html'));
	});

	app.listen(process.env.PORT || 8080, function() {
		console.log('Listening on port 8080');
	});
}());
