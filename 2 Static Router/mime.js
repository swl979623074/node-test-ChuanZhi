"use static"
var mime = require("./config/mime.json");

exports.getMime = function(type){
	return mime[type];
}