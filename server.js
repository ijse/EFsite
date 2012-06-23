
var app = require("./app.js");
app.listen(process.env['app_port'] || 80, function() {
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
