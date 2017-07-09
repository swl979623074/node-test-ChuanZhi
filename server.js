var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer(function(req,res){
	var path = url.parse(req.url)
	
	if("/" == req.url){
		res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"})
		res.write("hello");
		res.end();
	}
	if("/index" == req.url){
		fs.readFile("./web/index.html",function(err,data){
			res.writeHead(200,{"Content-Type":"text/html;charset=UTF-8"})
			res.write(data);
			res.end();
		})
	}
	if("/favicon.ico" == req.url){
		fs.readFile("./web/icon/favicon.png",function(err,data){
			res.writeHead(200,{"Content-Type":"text/image"});
			res.write(data);
			res.end();
		})
	}
})
server.listen(3000)