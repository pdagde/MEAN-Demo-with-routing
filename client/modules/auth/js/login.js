/**
 * Created by Pravin on 12/04/17.
 */

 
angular.module('apploginCtrl',[])
    .controller('loginCtrl',function ($scope,$http,$state,AuthService) {
       
       $scope.user = {};


       $scope.login = function(){

       	$http.post('/auth/login', $scope.user).then(function (response) {
          
          
         if(!response.data.error){
         	AuthService.userData(response.data[0]);
         	$state.go('app.home');
         }
             // 
                 // $state.go('app.home');
         })
       
       }
});
