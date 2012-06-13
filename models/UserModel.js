var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserModel = new Schema({
	name: {
		type: String,
		'default': 'annoymouse',
		index: true
	},
	pass: {
		type: String
	},
	email: {
		type: String,
		match: /(.+)@(.+)/
	},
	registDate: {
		type: Date,
		'default': Date.now
	},
	lastLoginTime: {
		type: Date,
		'default': Date.now
	}
});
mongoose.model("User", UserModel);
module.exports = UserModel;