/**
 * Compile less files
 */
var fs = require("fs");
var config = require("../config");
var path = require("path");
var less = require("less");
var parser = new(less.Parser)({
    paths: ["./public/less"], // Specify search paths for @import directives
    filename: 'style.less' // Specify a filename, for better error messages
});
console.log(__dirname);
exports = module.exports = function(src, dest) {
	var content = fs.readFile(src, "utf-8", function(err, data) {
		if(err) throw err;
		parser.parse(data, function(err, tree) {
			if(err) throw err;
			fs.writeFile(dest + "/" + path.basename(src, ".less") + ".css", tree.toCSS(), "utf-8", function(e) {
				if(e) throw e;
				console.log("Less File compiled!");
			});
		})
	})
}