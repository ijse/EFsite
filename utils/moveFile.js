var path = require("path");
var fs = require("fs");
var config = require("../config");
/**
 * Move files from temp to dest dir
 * @param  {String} tempFile   temple file path
 * @param  {String} fileName   file real name
 * @param  {String} destFolder dest folder
 * @return {String}            file url
 */
exports = module.exports = function(tempFile, fileName, destFolder) {
	var temp_path = tempFile;
	var file_name = path.basename(temp_path) + path.extname(fileName);
	var dest_path = destFolder + "/" + file_name;
	console.log(temp_path, dest_path);
	fs.rename(temp_path, dest_path, function(err) {
		if(err) {
			logger.error(file_name, "move fail!!\n", err);
		} else {
			// Delete temp file
			fs.unlink(temp_path);
		}
	});
	return dest_path;
}