/**
 * User Controller
 */
var utils = require("../utils");
var models = require("../models");
var config = require("../config");
var UserModel = models.get("User");

exports = module.exports ={
	/**
	 * 用户注册 - 打开注册表单页面
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	registView : function (req, res, next) {
		res.local("layout", "layout_1-1");
		utils.response(req, res, "pim/regist");
	},

	/**
	 * 用户注册 - 处理表单数据
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	regist: function(req, res, next) {
		var formData = req.body.user;
		// 用户头像使用www.gravatar.com中的， ?s=128 设置取用时的尺寸
		formData.email = formData.email.toLowerCase().trim();
		formData.pic = "http://www.gravatar.com/avatar/" + 
						utils.md5hash(formData.email);
		var user = new UserModel(formData);
		user.save(function(err, user) {
			if(err) {
				logger.debug(err);
				res.local("message", {
					title: "注册失败",
					content: "插入数据库时失败！",
					url: req.headers.referer
				});
			} else {
				req.body.user = {
					name: formData.name,
					pass: formData.pass
				}
			}
			next();
		})
	},

	/**
	 * 用户中心
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	pimView: function(req, res, next) {
		debugger;
		var p = req.param("pageName");
		console.log(p);
		if(!p) {
			p = "profile";
		}
		res.locals({
			//"BaseUrl": "/pim"
			main: p
		})
		utils.response(req, res, "pim/index");
	},

	/**
	 * 处理用户上传头像
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	uploadAvatar: function(req, res, next) {
		debugger;
		var pic120 = req.body.png1;
		var pic48 = req.body.png2;
		var pic24 = req.body.png3;

		var user = req.session.user;

		utils.saveAvatar([{
			filename: config.Dirs.staticDir + "/uploads/avatar/" + user._id + "_120.jpg",
			file: new Buffer(pic120, "base64")
		}, {
			filename: config.Dirs.staticDir + "/uploads/avatar/" + user._id + "_48.jpg",
			file: new Buffer(pic48, "base64")
		}, {
			filename: config.Dirs.staticDir + "/uploads/avatar/" + user._id + "_24.jpg",
			file: new Buffer(pic24, "base64")
		}], function(err) {
			res.local("success", "头像保存成功！");
			res.end("success=上传成功");
		})

	},
	/**
	 * 用户登陆
	 *
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	login: function(req, res, next) {
		var formData = req.body.user;
		if(res.local("message")) {
			// Comes from regist and regist failure
			next();
		}

		UserModel.findOne({
			name: formData.name
		}, function(err, user) {
			if(err) {
				res.local("message", {
					title: "登陆失败",
					content: "用户名不存在"
				});
			} else {
				if(user.pass !== formData.pass) {
					res.local("message", {
						title: "登陆失败",
						content: "密码输入错误"
					});
				} else {
					req.session.auth = true;
					req.session.user = user;

					// Update last login time async
					user.lastLoginTime = Date.now();
					user.save();

					res.local("message", {
						title: "登陆成功",
						content: "正在为您跳转...",
						url: req.headers.referer
					});
				}
			}
			next();
		})
	},

	/**
	 * 用户登出
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	logout: function(req, res, next) {
		req.session.auth = false;
		delete req.session.user;
		res.local("message", {
			title: "退出成功",
			content: "正在为您跳转到首页",
			url: "/index"
		});
		next();
	}

};
