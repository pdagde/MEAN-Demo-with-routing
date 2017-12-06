signupModule = angular.module('criveApp.signup.controllers', ['ngToast']);

signupModule.controller('SignupController', function($scope, $window, $http, ngToast){

	$scope.name = '';
	$scope.email = '';
	$scope.success = false;
	

	this.signup = function(){
		var fname = $scope.name.split(" ")[0];
		var lname;

		if($scope.name.split(" ").length > 1)
			lname = $scope.name.split(" ")[$scope.name.split(" ").length - 1];
		else
			lname = "";

		var sendData = { 
		em: $scope.email, 
		fna: fname,
		lna: lname
		}
		console.log(sendData);
		$http.post("/start/signup", sendData).success(function(data, status) {

			if(data.s == "p")
			{
				console.log(data);
				console.log(data.d);
				console.log(data.d.cr);
				if(data.d.cr == true)
					ngToast.create({
						timeout: 40000,
  						content: 'Successful Signup'+sendData.fna+'!<br> Now check your mail to finish! <br> or <br> <button class="btn btn-secondary">Skip to choose Theme</button>'
					});
				if(data.d.cr == false)
					ngToast.create({
  						className: 'warning',
  						timeout: 4000,
  						content: 'Looks like this email is already in the system! Try something else!'
					});
			}
        });
	}

	this.checkAuth = function(){

		$http.get("/start/check").success(function(data, status) {

			if(data.s == "p")
			{
				$window.location.href = '/dashboard';
			}

		});
	}
	
});