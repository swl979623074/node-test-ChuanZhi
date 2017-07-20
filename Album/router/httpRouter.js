"use static"
const fs = require("fs");
var url = require("url");
const path = require("path");

const mime = require("./mime.json");
const rootPath = path.join(__dirname,"..","public");

function indexPanel(res){
	let filePath = path.join(rootPath,"index.html");
	fs.readFile(filePath,function(err,data){
		res.writeHead(200,{"Content-Type":"text/html","charset":"UTF-8"});
		res.end(data);
	})
}

function handleAlbum(res,pathArr){
	let dirname = pathArr[1];
}

function handlePhoto(res,pathArr){
	
}

function getAllAlbumNames(res){
	let rsDir = [];
	let filePath = path.join(rootPath,"userImg");
	if(!fsExistsSync(filePath)){
		errorHandler(res,filePath);
		return;
	}
	fs.readdir(filePath,"UTF-8",function(err,files){
		let len = files.length;
		for(var file of files){
			(function(file){
				fs.stat(path.join(filePath,file),function(err,stats){
					len--;
					if(stats.isDirectory())
						rsDir.push(file);
					if(0 == len)
						res.end(JSON.stringify(rsDir));
				})
			})(file);
		}
	})
}

function getAllPthotOfAlbum(res,albumName){
	let rsFile = [];
	var filePath = path.join(rootPath,"userImg",albumName);
	if(!fsExistsSync(filePath)){
		errorHandler(res,filePath);
		return;
	}
	fs.readdir(filePath,"UTF-8",function(err,files){
		let len = files.length;
		for(var file of files){
			(function(file){
				fs.stat(path.join(filePath,file),function(err,stats){
					len--;
					if(!stats.isDirectory()){
						var obj = {url:"/userImg"+albumName+"/"+file,name:file}
						rsFile.push(obj);
					}
						
					if(0 >= len)
						res.end(JSON.stringify(rsFile));
				})
			})(file);
		}
	})
}

function errorHandler(res,filePath){
	res.writeHead(404,{"Content-Type":"text/html","charset":"UTF-8"});
	res.write("<h1>Error HttpRequest</h1>");
	res.write("<h2>Error in "+filePath+"</h2>");
	res.end();
}
//检测文件或者文件夹存在 nodeJS
function fsExistsSync(path) {
    try{
        fs.accessSync(path,fs.F_OK);
    }catch(e){
        return false;
    }
    return true;
}
exports.handleHttp = function(req,res){
	let pathname = url.parse(req.url).pathname;
	
	if("/" == pathname){
		indexPanel(res);
	}else if("/getAllAlbums" == pathname){
		getAllAlbumNames(res);
	}else{
		getAllPthotOfAlbum(res,pathname);
	}
}