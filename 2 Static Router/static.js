"use static"
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");
var mime = require("./mime.js")

http.createServer(function(req,res){
	handleReq(req,res);
}).listen(3000,"127.0.0.1")

function handleReq(req,res){
	var url_req = url.parse(req.url).pathname;
	if("/" == url_req){
		url_req = "/index.html";
	}
	var extname = path.extname(url_req);
	//存在扩展名
	if(extname){
		handleReqWhenHasExtname(res,url_req,extname);
	}else{
		handleReqWhenHasNoExtname(res,url_req);
	}
}

function handleReqWhenHasExtname(res,url,extname){
	if("/favicon.ico" == url){
		fs.readFile("./public/img/favicon.ico",function(err,data){
			res.writeHead(200,{"Content-Type":mime.getMime(extname),"charset":"UTF-8"})
			res.end(data);
			return;
		})
	}else{
		fs.readFile("./public"+url,function(err,data){
			if(err){
				errorHandler(res)
			}else{
				staticResourceHandler(res,extname,data);
			}
		})
	}
}

function handleReqWhenHasNoExtname(res,url){
	res.writeHead(200,{"Content-Type":"text/html","charset":"UTF-8"});
	res.write("<h1>this is a ajax request</h1>");
	res.write("<h3>url: "+url+"</h3>");
	res.end();
}

function errorHandler(res){
	res.writeHead(404,{"Content-Type":"text/html","charset":"UTF-8"});
	res.write("<h1>Not Found 404</h1>");
	res.write("<h3>Can't Find The Request Source</h3>");
	res.end();
}

function staticResourceHandler(res,extname,data){
	res.writeHead(200,{"Content-Type":mime.getMime(extname),"charset":"UTF-8"})
	res.end(data);
}