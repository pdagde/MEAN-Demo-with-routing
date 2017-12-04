/**
 * Created by Pravin on 12/04/17.
 */

 
angular.module('appMainCtrl',[])
    .controller('HelloWordCtrl',function ($scope,$http) {
        $scope.msg ='';
        $scope.msg = 'Welcome to Mattrcks.in!!';
        console.log('welcome to mattrcks.in')

   $scope.gorrrs = function(){
          
   
$http.post('/api/smilies', {}).then(function (response) {
});




        };


});