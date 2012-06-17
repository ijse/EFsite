/**
 * Module dependencies.
 */
var express = require('express');
var mongoose = require('mongoose');

var config = require(__dirname + "/config.js");
var utils = require(__dirname + "/utils");
var mids = require(__dirname + "/middlewares");
var app = module.exports = express.createServer();

// 暂时注释掉的Log4js
// global.log4js = require("log4js");
// log4js.configure(__dirname + "/log4js-config.json");
// var logger = global.logger = log4js.getLogger();

config.Debug = app.settings.env === "production" ? false : config.Debug;

// Configuration
app.configure(function() {
    app.set('views', config.Dirs.viewDir);
    app.set('view engine', config.Views.engine);
    app.use(express.bodyParser({uploadDir:config.Dirs.temp}));
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.SessionSecret
    }));
    mids.init(app, mids.middlewares);
    app.use(express.static(config.Dirs.staticDir + "/"));
	
    app.settings.env = config.Debug ? "development" : "production";
});

// Configure development mode
app.configure('development', function() {
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
    mongoose.connect(config.DataBase.testUrl); // test database
});

// Configure production mode
app.configure('production', function() {
    // Compile Less files
    // 下面这段代码在有的环境下会出错，所以暂时注释掉了
    // 在本地运行没有问题
    // utils.lessCompile(config.Dirs.staticDir + "/less/bootstrap.less", 
    //                    config.Dirs.staticDir + "/css");
    app.use(express.errorHandler());
    mongoose.connect(config.DataBase.url); // online database
});

// Regist models
require("./models").init(mongoose);

// Apply Routes
require("./routes")(app, mids);

