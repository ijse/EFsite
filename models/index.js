/**
 * Entry for models
 */
var mongoose = require("mongoose");
var fs = require("fs");
exports = module.exports.init = function() {

	fs.readdirSync(__dirname).forEach(function(item, index, arr) {
		if(item === "index.js") return ;
		var model = require("./" + item);
		mongoose.model(item.replace(/Model\.js$/, ''), model);
	});

}

exports = module.exports.get = function(model) {
	return mongoose.model(model);
}