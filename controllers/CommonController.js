/**
 * Common controller
 */
var utils = require("../utils");
var config = require("../config");

exports = module.exports = {
	index: function(req, res, next) {
		res.locals({
			title: "NAD LIFE",
			active: {
				index: true
			},
			PType: "post"
		});

		if(req.param("f") == "true") {
			res.local("message", {
				title: "测试消息",
				content: "内容，，内容！！"
			});
			next();
		} else {
			utils.response(req, res, "index");
		}
	},
	/**
	 * Ajax upload 
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {JSON}        upload file description
	 */
	ajaxUpload: function(req, res, next) {
  		var ofile = req.files.userFile;
  		ofile.url = utils.moveFile(ofile.path, ofile.name, config.Dirs.uploadDir);
  		res.end(JSON.stringify(ofile));
	},
	xheditorImgUpload: function(req, res, next) {
		var ofile = req.files.filedata;
		ofile.url = utils.moveFile(ofile.path, ofile.name, config.Dirs.uploadDir + "/images");
  		res.end(JSON.stringify({
  			err:"",
  			msg: ofile.url.replace(config.Dirs.staticDir + "/", "")
  		}));
	}
}
