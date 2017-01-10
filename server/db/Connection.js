(function() {
	'use strict';
	const DB = require('./DB.js');

	class Connection extends DB {
		constructor(dbname, user, pw) {
			super(dbname, user, pw);
			this.init();

		}

		init() {
			let { db } = this;
			db.on('error', console.error.bind(console, 'connection error:'));
			db.once('open', function() {
				console.log('connected to db');
			});
		}
	}

	function getConnection() {
		let env = process.env.NODE_ENV || 'dev';
		const DBNAME = env === 'production' ? 'ds161518.mlab.com:61518/heroku_7k27vqpx' : 'mongodb://localhost/supersand';
		const USER = 'admin';
		const PASSWORD = env === 'production' ? 'busbybmw69' : 'admin';


		var connection = new Connection(DBNAME, USER, PASSWORD);
	}

	let conn = false;
	module.exports = (function(dbname, user, pw) {
		if (!conn) {
			conn = getConnection();
		}
		return conn;
	}());
}());
