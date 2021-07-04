var myapp= angular.module('myapp', [])
myapp.controller('myctrl', function($scope, $http){
	$scope.content={};
	$scope.contentdata=[]

	$scope.postdata= function(val){
		console.log(val);
		if(val.email==undefined || val.password==undefined )
		{
			alert("empty fields are not accepted");
		}
		else{
		$http({
			method:'post',
			url:'/nandu',
			data:val
		}).then(function(success){
			console.log(success)
			$scope.content= {};
			$scope.contentdata.push(val);
		}, function(error){
			alert(error)
		})
	}}
})