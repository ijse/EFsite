
var mongoose = require("mongoose");
exports = module.exports = function(hex) {
	return mongoose.Types.ObjectId(hex);
}