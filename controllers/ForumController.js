
var utils = require("../utils");
var models = require("../models");
var PostModel = models.get("Post");
exports = module.exports = {
	index: function(req, res, next) {
		var limit = 5;
		var page = req.param("page") || 1;

		res.locals({
			title: "讨论板",
			active: {
				forum: true
			},
			layout: "layout_2-1",
			sidebar: "index"
		});
		PostModel.count({}, function(err, num) {
			var totalPage = Math.ceil(num / limit);
			page = Math.min(page, totalPage);
			page = Math.max(1, page);
			res.locals({
				pager: {
					total: totalPage,
					page: page,
					limit: limit
				}
			})
			PostModel.where()
					.skip(limit * (page-1))
					.limit(limit)
					.populate('reply.postUser')
					.populate('postUser') // load postUser
					.desc("reply.replyTime") // desc by postTime
					.run(function(err, list) {
						if(!err) {
							res.locals({
								"postList": list
							});
							utils.response(req, res, "forum");
						} else {
							throw err;
						}
					});
			
		});
	},
	/**
	 * 发表帖子
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	post: function(req, res, next) {
		var data = {};
		var user = req.session.user;
		user._id = utils.ObjectId(user._id);
		data.content = req.body.post.content;
		data = {
			title: req.body.post.title,
			content: req.body.post.content,
			postUser: user._id,
		}
		// Regard first line of content as title
		//data.title = data.content.substring(0, data.content.indexOf("\n"));
		//data.content = data.content.replace(data.title, "");

		var post = new PostModel(data);
		post.save(function(err, post) {
			if(!err) {
				// Post Success
				res.redirect("/forum");
			} else {
				throw err;
			}
		});
	},
	/**
	 * 显示某个帖子的内容
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {[type]}        [description]
	 */
	showPost: function(req, res, next) {
		var pid = req.param("pid");
		PostModel.findById(pid).populate("postUser")
		  .populate("reply.postUser").run(function(err, post) {
			if(!err) {
				res.locals({
					title: post.title,
					active: {
						forum: true
					},
					post: post,
					layout: "layout_2-1",
					sidebar: "index"
				});
				utils.response(req, res, "post");
			} else {
				throw err;
			}
		})
	},
	comment: function(req, res, next) {
		var pid = req.param("pid");
		var content = req.body.comment["content"];

		var comment = {
			content: content,
			postUser: req.session.user._id,
			postTime: Date.now
		};
		PostModel.comment(utils.ObjectId(pid), comment, function(err, post) {
			if(err) throw err;
			res.redirect("/forum/" + pid);
		})


	}
}