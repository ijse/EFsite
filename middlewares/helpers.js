
var config = require("../config.js");
var moment = require("moment");
module.exports = {
	"dynamicHelpers": {
		session: function(req, res) {
			return req.session;
		}
	},
	"staticHelpers": {
		config: config,
		BaseUrl: config.BaseUrl,
		//VIEW_DIR: config.Dirs.viewDir + "/",
		//BASE_URL: config.BaseUrl,
		//SITE_NAME: config.AppName,
		dateFormat: function(date, fmt) {
			var d = new moment(date);
			return d.format(fmt);
		}
	}
}