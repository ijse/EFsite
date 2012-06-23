var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserModel = new Schema({
	pic: {
		type: String
	},
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
	},
	role: {
		type: String,
		'default': "newbie"
	}
});
mongoose.model("User", UserModel);
//module.exports = UserModel;
module.exports = exports = mongoose.model("User");
