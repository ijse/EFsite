/**
 * Common controller
 */
var utils = require("../utils");
var config = require("../config");

exports = module.exports = {
	index: function(req, res, next) {
		res.locals({
			title: "首页",
			active: {
				index: true
			},
			PType: "post"
		});
		utils.response(req, res, "index");
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
