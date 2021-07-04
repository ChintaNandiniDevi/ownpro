var app=angular.module('myapp2',[])
app.controller('mycntrl2',function($scope, $http){
	$scope.forget={};
	$scope.hide=false;
	$scope.hide1=false;
	$scope.pass=false;
	$scope.otp=true;

	$scope.checkuser=function(value){
		$http({
			method:'post',
			url:'/checkmail',
			data:value
		}).then(function(success){
			console.log(success)
			$scope.hide=true;
			$scope.hide1=true;
			
		},function(error){
			alert('something went wrong');
		})
	}

	$scope.checkotp=function(value){
		$http({
			method:'post',
			url:'/checkotp',
			data:value
		}).then(function(success){
			alert("otp matched")
			console.log(success)
			$scope.otp=false;
			$scope.pass=true;

		},function(error){
			alert(error)
		})
	}


	$scope.changepass=function(value){
		if(value.password==null || value.cpwd==null){
			alert('please fill the fields')
		}
		else{
	
		$http({
			method:'post',
			url:'/cpassword',
			data:value
		}).then(function(success){
			alert("password updated successfully")
			$scope.hide1=false;
		},function(error){
			alert('password not updated ..try again')
		})
	}
}
})