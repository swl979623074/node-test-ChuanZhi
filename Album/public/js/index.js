"use static"
var app = angular.module("myApp",[]);
app.controller("myCtl",function($scope,$http){         
	$http.get("/getAllAlbums").success(function(data){
		$scope.datas = data;
	})
	$scope.getphotos = function(name){
		$http.get("/"+name).success(function(data){
			$scope.datas = null;
			$scope.photos = data;
			$scope.albumName = " > "+name;
		}).error(function(data){
			console.log(data)
		})
	}
})