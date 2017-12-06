
/**
 * Created by Pravin on 12/04/17.
 */

 
angular.module('appverifyCtrl',[])
    .controller('verifyCtrl',function ($scope,$http,$state,AuthService) {
     $scope.UserRecords = AuthService.retrive();
     $scope.verification = {};

     $scope.checkverificationCode = function(){
        $scope.vcode = $scope.verification.code; 
         var query = {
         	email: $scope.UserRecords.email,
         	code : $scope.verification.code
         }
     	 $http.post('/auth/verifiemailcode', query).then(function (response) {
            if(response.data[0]){
                AuthService.userData(response.data[0]);
                 $state.go('app.home');
            }
            // app.home
         })
     	// 
     } 

    $scope.resendcode = function(){
    	 var query = {
         	email: $scope.UserRecords.email
         }
          $http.post('/auth/resendCode', query).then(function (response) {
         })
    } 

});

