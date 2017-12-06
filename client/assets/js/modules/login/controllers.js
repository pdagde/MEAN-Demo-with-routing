loginModule = angular.module('criveApp.login.controllers', ['cgNotify']);

loginModule.controller('LoginController', function($scope, $http, $window, notify){

	$scope.name = '';
	$scope.email = '';
	$scope.pwd = '';

	this.setModal = function (state) {
		$scope.modalState = state;
	}

	this.process = function(){

		if($scope.modalState == 'login')
		{
			var sendData = { 
				em: $scope.email, 
				pw: $scope.pwd 
			}
			console.log(sendData);
			$http.post("/start/login", sendData).success(function(data, status) {

				if(data.s == 'p')
					$window.location.href = '/';
	        });
		}
		else if($scope.modalState == 'signup')
		{
			var sendData = { 
			em: $scope.email, 
			fna: $scope.name.split(" ")[0],
			lna: $scope.name.split(" ")[$scope.name.split(" ").length - 1]
			}
			console.log(sendData);
			$http.post("/start/signup", sendData).success(function(data, status) {

				if(data.s == "p")
				{
					console.log(data);
					console.log(data.d);
					console.log(data.d.cr);
					if(data.d.cr == true)
						notify({ message: 'Ahoy Matey '+data.d.na.charAt(0).toUpperCase() + data.d.na.slice(1)+'! Welcome aboard! Just one more step. Verify the email we sent at '+$scope.email, classes: 'alert-success'});
					if(data.d.cr == false)
						notify({ message: 'Looks like this email is already in the system! Try something else!', classes: 'alert-error'});
				}
	        });
		}
		else if($scope.modalState == 'password')
		{
			var sendData = { 
				em: $scope.email
			}

			$http.post("/start/forgetpwd", sendData).success(function(data, status) {

				if(data.s == 'p')
					notify({ message: 'We have emailed your verification link to reset the password', classes: 'alert-success'});
				else
					notify({ message: 'Sorry! We could not find anyone with that email.', classes: 'alert-success'});
				
	        });
		}
		
	}

	this.login = function(){

		var sendData = { 
		em: $scope.email, 
		pw: $scope.pwd 
		}
		console.log(sendData);
		$http.post("/start/login", sendData).success(function(data, status) {

			if(data.s == 'p')
				$window.location.href = '/';
        });
	}

	this.forget = function(){
		var sendData = { 
			em: $scope.email
		}

		$http.post("/start/forgetpwd", sendData).success(function(data, status) {

			if(data.s == 'p')
				notify({ message: 'We have emailed your verification link to reset the password', classes: 'alert-success'});
			else
				notify({ message: 'Sorry! We could not find anyone with that email.', classes: 'alert-success'});
			
        });
	}

	this.signup = function(){

		var sendData = { 
		em: $scope.email, 
		fna: $scope.name.split(" ")[0],
		lna: $scope.name.split(" ")[$scope.name.split(" ").length - 1]
		}
		console.log(sendData);
		$http.post("/start/signup", sendData).success(function(data, status) {

			if(data.s == "p")
			{
				console.log(data);
				console.log(data.d);
				console.log(data.d.cr);
				if(data.d.cr == true)
					notify({ message: 'Ahoy Matey '+data.d.na.charAt(0).toUpperCase() + data.d.na.slice(1)+'! Welcome aboard! Just one more step. Verify the email we sent at '+$scope.email, classes: 'alert-success'});
				if(data.d.cr == false)
					notify({ message: 'Looks like this email is already in the system! Try something else!', classes: 'alert-error'});
			}
        });
	}

	this.fb = function(){

		$window.location.href = '/facebook/auth/login';
	}

	this.insta = function(){

		$window.location.href = '/instagram/auth/login';
	}

	this.google = function(){

		$window.location.href = '/google/auth/google';
	}
});

	