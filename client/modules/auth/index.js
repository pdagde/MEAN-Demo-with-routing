/**
 * Created by Pravin on 12/04/17.
 */

angular.module('appMain',['appauthCtrl','apploginCtrl','AuthService','appverifyCtrl'])

.config(function($stateProvider) {
    $stateProvider

        .state('app.signUp', {
            url: "/signUp",
            templateUrl: "modules/auth/template/signUp.html",
            controller: "authCtrl"
        })
         .state('app.verify', {
            url: "/verify",
            templateUrl: "modules/auth/template/verifyemail.html",
            controller: "verifyCtrl"
        })
        .state('app.login', {
            url: "/login",
            templateUrl: "modules/auth/template/login.html",
            controller: "loginCtrl"
        })
});



