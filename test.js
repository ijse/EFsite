// var log4js = require("log4js");
// console.log(require("./log4js-config.json"));
// log4js.configure("log4js-config.json");

// var logger = log4js.getLogger();

// logger.error("WRonG");
// logger.debug("I'm debugging.. ");
// logger.log("INFO", "hi!");

// var less = require("less");
// var fs = require("fs");
// var utils = require("./utils");


// utils.lessCompile("./public/less/bootstrap.less", "./public/css");

var moment = require("moment");
var now = new moment(new Date("2012-10-18")); 
console.log(now.format('dddd, MMMM Do YYYY, h:mm:ss a'));

