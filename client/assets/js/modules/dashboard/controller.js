dashModule = angular.module('criveApp.dashboard.controllers', ['cgNotify']);

dashModule.controller('DashboardController', function($scope, $http, $window, notify){

	$scope.name = 'Jay Mistry';
	$scope.email = '';
	$scope.pwd = '';

	$scope.getUser = function(){

		$http.get("/dashboard/user").success(function(data, status) {

			if(data.s == 'pl')
				$scope.name = data.r.fna + ' ' + data.r.lna;
			else if(data.s == 'ps')
				$scope.name = data.r.name;
			else
				$window.location.href = '/';

        });
	}

	this.logout = function(){
		
		$window.location.href = '/logout';
	}

	
});