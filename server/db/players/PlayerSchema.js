const mongoose = require('mongoose');
const { Schema } = mongoose;

module.exports = new Schema({
	username : {
		type: String,
		unique: true
	},
	password : String,
	secret : {
		question : String,
		answer : String
	},
	games : Array
});
