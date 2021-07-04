var myapp= angular.module('myapp', [])
myapp.controller('myctrl', function($scope, $http){
	$scope.content={};
	$scope.contentdata=[]

	$scope.postee= function(val){
		console.log(val);
		if(val.fname==undefined || val.lname==undefined || val.email==undefined|| val.phno==undefined|| val.dob==undefined || val.gender==undefined|| val.country==undefined )
		{
			alert("empty fields are not accepted");
		}
		else{
		$http({
			method:'post',
			url:'/posting',
			data:val
		}).then(function(success){
			console.log(success)
			$scope.content= {};
			$scope.contentdata.push(val)
		}, function(error){
			alert("already exists")
		})
	}}
})