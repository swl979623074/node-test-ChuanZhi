var http = require("http");
var url = require("url");

var server = http.createServer(function(req,res){
	var userUrl = req.url;
	res.writeHead(200,{"Content-Type":"text/html;charset=UTF8"});
	console.log(userUrl,userUrl.substr(0,9))
	if("/student/" == userUrl.substr(0,9)){
		var student = userUrl.substr(9)
		if(/^\d{10}$/.test(student)){
			res.end("The Student ID Is: "+student);
		}else{
			res.end("Error Student ID: "+student);
		}
	}else if("/teacher/" == userUrl.substr(0,9)){
		var teacher = userUrl.substr(9)
		if(/^\d{6}$/.test(teacher)){
			res.end("The Teacher ID Is: "+teacher);
		}else{
			res.end("Error Teacher ID: "+teacher);
		}
	}else{
		res.end("Error Router");
	}
	
})

server.listen(3000)