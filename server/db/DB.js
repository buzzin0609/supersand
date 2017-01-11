(function() {
	'use strict';

	var mongoose = require('mongoose');
	mongoose.Promise = global.Promise;
	class DB {
		constructor(dbname, user, pw) {
			mongoose.connect(dbname, {
				user: user,
				pass: pw
			});
			this.db = mongoose.connection;
		}
	}

	module.exports = DB;

}());
