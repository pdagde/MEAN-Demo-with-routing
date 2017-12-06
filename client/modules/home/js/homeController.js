/**
 * Created by Pravin on 12/04/17.
 */

angular.module('appHomeCtrl',[])
    .controller('homeCtrl',function ($scope,AuthService) {
    $scope.msg = 'Welcome  to Blog';
    $scope.user = AuthService.authuser();
    console.log("pipipipipipipipipipi",JSON.stringify($scope.user));
})