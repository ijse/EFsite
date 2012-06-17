
/**
 * Init routes
 */
var importController = require("../controllers");

var common = importController("CommonController");
var user = importController("UserController");
var forum = importController("ForumController");

module.exports = function(app, mids) {
	app.get(/^(\/$|\/index(.html|.htm)?)$/, common.index);

	app.get("/regist", user.registView);
	app.post("/regist", user.regist, user.login);
	app.post("/login", user.login);
	app.get("/logout", user.logout);
	app.get("/pim", user.pim);

	app.get("/forum$", forum.index);
	app.get("/forum_:page$", forum.index);
	app.post("/forum/post", forum.post);
	app.get("/forum/:pid", forum.showPost);
	app.post("/forum/comment/:pid", forum.comment);

	// -----------------
	app.post("/upload", common.ajaxUpload);
	app.post("/upload_img", common.xheditorImgUpload);
}

function stamp(ptype, nactive) {
	return function(req, res, next) {
		var t = {};
		t[nactive] = true;
		res.locals({
			PType: ptype,
			NavActive: t
		});
		next();
	}
}