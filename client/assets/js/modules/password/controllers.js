/*For some reason angular $localtion.search() doesnt work for accessing the query string. 
* So using a pure javascript get around. Need to come back to it.
*/
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


passwordModule = angular.module('criveApp.password', ['ngPassword', 'ngMessages']);

passwordModule.controller('PasswordController', function($scope, $http, $window){

	$scope.pwd = '';
	$scope.conPwd = '';

	

	this.set = function(){

		
		email = getParameterByName('em');
		var sendData = { 
		em: email, 
		pw: $scope.pwd 
		}
		console.log(sendData);
		$http.post("/start/setPassword", sendData).success(function(data, status) {
	
			$window.location.href = '/';
        });
        
	}

});
	