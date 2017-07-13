var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
	var path = url.parse(req.url).pathname;
	var query = url.parse(req.url,true).query;
	console.log("path: " + path + ",query: " + JSON.stringify(query));
	
	if("/" == path){
		res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"})
		res.write("hello");
		res.end();
	}
	if("/index" == path){
		fs.readFile("./web/index.html",function(err,data){
			res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"})
			res.write(data);
			res.end();
		})
	}
	if("/favicon.ico" == path){
		fs.readFile("./web/icon/favicon.png",function(err,data){
			res.writeHead(200,{"Content-Type":"text/image"});
			res.write(data);
			res.end();
		})
	}
	if("/perison" == path){
		res.writeHead(200,{"Content-Type":"text/plain;charset=UTF-8"});
		res.write("返回");
		res.write(JSON.stringify(query));
		res.end();
	}
})
server.listen(3000)