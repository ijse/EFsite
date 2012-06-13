/**
 * Define middle wares
 */

var mids = exports.middlewares = {
	before: [

	],
	after: [
		require("./msg.js"),
		require("./page404.js")
	],
	helpers: require("./helpers.js")

}

module.exports.init = function(app) {
	// View Helpers
	app.dynamicHelpers(mids.helpers.dynamicHelpers);
	app.helpers(mids.helpers.staticHelpers);

	// Middle wares
	mids.before.forEach(useMid);
	app.use(app.router);
	mids.after.forEach(useMid);

	function useMid(item, index, arr) {
		app.use(item);
	}
}

module.exports.get = function(mid_name) {
	return require("./" + mid_name);
}

