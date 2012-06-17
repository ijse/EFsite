/**
 * User Controller
 */
var utils = require("../utils");
var models = require("../models");

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

	pim: function(req, res, next) {
		utils.response(req, res, "pim/index");
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
