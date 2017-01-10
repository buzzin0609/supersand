var express = require('express');
var app = express();
module.exports = app;
var path = require('path');
var root = __dirname + '/../';

console.log(root);
require('./db/Connection');
require('./api/routes');

app.use('/static', express.static(path.join(__dirname,'../build/static')));
app.use('/img', express.static(path.join(__dirname,'../build/img')));

app.get('/', function(req, res){
	res.sendFile(path.join(root+'/build/index.html'));
});

app.listen(process.env.PORT || 8080, function() {
	console.log('Listening on port 8080');
});
