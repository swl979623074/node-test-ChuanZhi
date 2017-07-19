"use static"
const fs = require("fs");
const url = require("url");
const path = require("path");

const mime = require("./mime.json");
const rootPath = path.join(__dirname,"..","public");

let pathname;
let extname;

function handleFavicon(req,res){
	let iconPath = path.join(rootPath,"icon",pathname);
	fs.readFile(iconPath,function(err,data){
		if(err){
			errorHandler(res);
		}else{
			res.writeHead(200,{"Content-Type":mime[extname],"charset":"UTF-8"});
			res.end(data);	
		}		
		return;
	})
}

function handleStaticFile(req,res){
	let filePath = path.join(rootPath,pathname);
	fs.readFile("./public"+filePath,function(err,data){
		if(err){
			errorHandler(res)
		}else{
			res.writeHead(200,{"Content-Type":mime[extname],"charset":"UTF-8"})
			res.end(data);
		}
	})
}

function errorHandler(res){
	res.writeHead(404,{"Content-Type":"text/html","charset":"UTF-8"});
	res.write("<h1>Not Found 404</h1>");
	res.write("<h3>Can't Find The Request Source: "+pathname+"</h3>");
	res.end();
}

exports.handleFile = function(req,res){
	pathname = url.parse(req.url).pathname;
	extname = path.extname(pathname);
	
	if(".ico" == extname){
		handleFavicon(req,res);
	}else{
		handleStaticFile(req,res);
	}
}