let mongoose = require('mongoose');

let PlayerModel = require('./PlayerModel');

module.exports = class Player {
	constructor(args) {
		this.doc = new PlayerModel({
			username : args.username,
			password : args.password
		});
		this.ready = this.doc.save();
	}

};
