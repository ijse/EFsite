/**
 * Handle page 404
 */
var config = require("../config.js");
var path = require("path");
module.exports = function(req, res, next) {
	//check if file exist in PUBLIC_DIR
	var filePath = req.path;
	if(!path.existsSync(config.Dirs.staticDir + "/" + filePath)) {
		res.render("message", {
			title: "404 该页没找到",
			message: {
				title: "404该页没找到！",
				content: "您访问的页面<em>" + req.url + "</em>没有找到!",
				url: req.headers.referer
			}
		})
	} else {
		next();
	}
}
