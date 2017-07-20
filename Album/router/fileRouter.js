"use static"
const fs = require("fs");
const url = require("url");
const path = require("path");

const mime = require("./mime.json");
const rootPath = path.join(__dirname,"..","public");

function handleFavicon(req,res){
	let pathname = url.parse(req.url).pathname;
	let extname = path.extname(pathname);
	let iconPath = path.join(rootPath,"icon",pathname);
	
	fs.readFile(iconPath,function(err,data){
		if(err){
			console.log(err);
			errorHandler(req,res);
		}else{
			res.writeHead(200,{"Content-Type":mime[extname],"charset":"UTF-8"});
			res.end(data);	
		}		
		return;
	})
}

function handleStaticFile(req,res){
	let pathname = url.parse(req.url).pathname;
	let extname = path.extname(pathname);
	let filePath = path.join(rootPath,pathname);
	fs.readFile(filePath,function(err,data){
		if(err){
			console.log(err);
			errorHandler(req,res);
		}else{
			res.writeHead(200,{"Content-Type":mime[extname],"charset":"UTF-8"});			
			res.end(data);
		}
	})
}

function errorHandler(req,res){
	let pathname = url.parse(req.url).pathname;
	res.writeHead(404,{"Content-Type":"text/html","charset":"UTF-8"});
	res.write("<h1>Not Found 404</h1>");
	res.write("<h3>Can't Find The Request Source: "+pathname+"</h3>");
	res.end();
}

exports.handleFile = function(req,res){
	var pathname = url.parse(req.url).pathname;
	var extname = path.extname(pathname);
	console.log("请求资源："+pathname)
	if(".ico" == extname){
		handleFavicon(req,res);
	}else{
		handleStaticFile(req,res);
	}
}