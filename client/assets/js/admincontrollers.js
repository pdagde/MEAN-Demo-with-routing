var app = angular.module('criveAdminApp', []);

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

app.controller('AdminController', function($scope, $window, $http){

	$scope.user = '';
	$scope.pwd = '';
	$scope.remember = '';
	$scope.state = 'login';

	$scope.onboard = function () {
		var em = getParameterByName('em');
		var sendData = {
			email: em, 
			pass: 'temp',
			remember: true
		}
		$http.post("/user/login", sendData).success(function(data, status) {
			if(data.s == 'p')
			{
				if(data.d)
					$window.location.href = '/onboarding';
				else
					$window.location.href = '/dashboard';

			}
			
        });
	}

	this.login = function () {

		if($scope.remember == '')
			$scope.remember = false;
		var sendData = {
			user: $scope.user, 
			pass: $scope.pwd,
			remember: $scope.remember
		}
		console.log(sendData);
		$http.post("/admin/login", sendData).success(function(data, status) {

			if(data.s == 'p')
			{

				$scope.state = 'dash';
			}
			else if(data.s == 'f')
			{
				if(data.d == 'nopass')
					swal("Wrong Password!", "Try again with corrent password!", "error")
				else
					swal("Access Denied!", "You are not an admin!", "error")
			}
        });
	}
	this.signup = function () {

		var sendData = {
			em: $scope.mail, 
			fna: $scope.fullname.split(" ")[0],
			lna: $scope.fullname.split(" ")[$scope.fullname.split(" ").length - 1]
		}
		console.log(sendData);
		$http.post("/user/signup", sendData).success(function(data, status) {

			if(data.s == 'p')
			{
				$scope.state = 'dash';
			}
        });
	}


	this.logout = function() {
		$window.location.href = '/users/logout';
	}


		
});