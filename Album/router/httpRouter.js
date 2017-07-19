"use static"
const fs = require("fs");
var url = require("url");
const path = require("path");

const mime = require("./mime.json");
const rootPath = path.join(__dirname,"..","public");

let pathname;
let splitUrl;

function indexPanel(req,res){
	let filePath = path.join(rootPath,"index.html");
	fs.readFile(filePath,function(err,data){
		res.writeHead(404,{"Content-Type":"text/html","charset":"UTF-8"});
		res.end(data);
	})
}

function handleAlbum(req,res){
	
}

function handlePhoto(req,res){
	
}

function errorHandler(res){
	res.writeHead(404,{"Content-Type":"text/html","charset":"UTF-8"});
	res.write("<h1>Error HttpRequest</h1>");
	res.end();
}

exports.handleHttp = function(req,res){
	pathname = url.parse(req.url).pathname;
	splitUrl = pathname.split("/");
	let len = splitUrl.length;
	console.log(len);
	if(1 == len){
		indexPanel(req,res);
	}else if(2 == len){
		indexPanel(req,res);
	}else if(3 == len){
		handlePhoto(req,res);
	}else{
		errorHandler(res);
	}
	
}