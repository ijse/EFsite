
/**
 * Return data according to request type
 * @param  {Object} req  
 * @param  {Object} res  
 * @param  {String} view view for rendering
 */
module.exports = function(req, res, view) {
	var accept = req.headers.accept || '';
	if (~accept.indexOf('html')) {
 		res.render(view);
 	} else if (~accept.indexOf('json')) {
 		var json = JSON.stringify(res.locals());
        res.setHeader('Content-Type', 'application/json');
        res.end(json);
 	} else {
 		req.next();
 	} /*else {

 		var txt = "Access Forbidden!!";
 		res.setHeader('Content-Type','text/plain');
 		res.end(txt);
 	}*/
}