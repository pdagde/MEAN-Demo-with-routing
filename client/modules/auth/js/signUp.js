/**
 * Created by Pravin on 12/04/17.
 */

 
angular.module('appauthCtrl',[])
    .controller('authCtrl',function ($scope,$http,$state,AuthService) {
     
     $scope.UserDetails = {};

$scope.signUp = function() {
                 
     $http.post('/auth/signUp', $scope.UserDetails).then(function (response) {
     	if(!response.data.error){
     		 AuthService.store($scope.UserDetails);
             $state.go('app.verify');
     	}
     });
}
});