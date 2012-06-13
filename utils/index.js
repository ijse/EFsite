/**
 * Application utils
 */
var fs = require("fs");

module.exports = (function() {
	var utils = {};
	var list = fs.readdirSync(__dirname);
	list.forEach(function(item, index, arr) {
		var isFile = fs.statSync(__dirname + "/" + item).isFile();
		if(isFile && item !== "index.js") {
			utils[item.substring(0, item.length - 3)] = require(__dirname + "/" + item);
		}
	});

	return utils;
})();