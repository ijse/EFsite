/**
 * 保存用户头像
 * @type {[type]}
 */
var fs = require("fs");

exports = module.exports = function(file_arr, callback) {
	file_arr.forEach(function(item, index, arr) {
		fs.writeFileSync(item.filename, item.file);
	});
	callback.apply(callback.callee, undefined);
}