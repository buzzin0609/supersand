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
		const DBNAME = 'mongodb://localhost/supersand';
		const USER = 'admin';
		const PASSWORD = 'admin';


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
