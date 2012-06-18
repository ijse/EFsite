
var crypto = require("crypto");
/**
 * 生成md5
 * @param  {String} str Just String or Buffer
 * @return {String}     md5 value
 */	
exports = module.exports = function(str) {
	var md5 = crypto.createHash("md5");
	md5.update(str + "");
	return md5.digest("hex");
}