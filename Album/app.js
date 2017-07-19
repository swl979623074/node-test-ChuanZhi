var http = require("http");
var url = require("url");
var path = require("path");
var fileRouter = require("./router/fileRouter.js");
var httpRouter = require("./router/httpRouter.js");

var server = http.createServer(function(req,res){
	var extname = path.extname(url.parse(req.url).pathname);
	if(extname){
		fileRouter.handleFile(req,res);
	}else{
		httpRouter.handleHttp(req,res);
	}
})

server.listen(3000);