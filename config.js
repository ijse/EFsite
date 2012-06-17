/**
 * App configuration
 */

module.exports = {
	// Debug mode:
	// 1. Cache
	// 2. Auto-compile less files
	// 3. Different database
	Debug: false,  // 优先采用环境变量NODE_ENV的值

	logo: "MyApp",
	AppName: "MyApp",
	BaseUrl: "/",

	SessionSecret: "My Session Secret",

	DataBase: {
		testUrl: "mongodb://nD0HSNNqvGjP:hySWfkcRUu@127.0.0.1:20088/BzTHAcYHXzQn",
		url: "mongodb://nodesitedb:nodesitedbpass@ds033477.mongolab.com:33477/nodesite"
	},

	Views: {
		engine: "ejs",
		page404: "",
		page500: ""
	},
	Dirs: {
		controllers: __dirname + "/controllers",
		middlewares: __dirname + "/middlewares",
		models: __dirname + "/model",
		routes: __dirname + "/routes",

		rootDir: __dirname,
		viewDir: __dirname + '/views',
		staticDir: __dirname + '/public',
		utils: __dirname + "/utils",
		logs: __dirname + "/logs",
		temp: __dirname + "/tmp",
		uploadDir: __dirname + "/public/uploads"
	}
}