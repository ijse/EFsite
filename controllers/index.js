
/**
 * Entry for controllers
 */

module.exports = function(name) {
	return require("./" + name + ".js");
}
