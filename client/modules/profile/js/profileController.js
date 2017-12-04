/**
 * Created by Pravin on 12/04/17.
 */

angular.module('appProfileController',[])
    .controller('ProfileCtrl',function ($scope,$http) {
        $scope.msg ='';
        $scope.msg = 'Welcome to Mattrcks.in profile page!!';
        console.log('welcome to mattrcks.in')

});