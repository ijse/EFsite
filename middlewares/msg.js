
/**
 * Message page handler
 */
var utils = require("../utils");
module.exports = function(req, res, next) {
	var msg = res.local("message");
 	if(typeof msg !== "undefined") {
 		utils.response(req, res, "message");
 	} else {
 		next();
 	}
}