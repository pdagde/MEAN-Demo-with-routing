var app = angular.module('CriveApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise("/");
    $stateProvider
    .state('/',{
        url: "/",
        templateUrl: "home.html",
        controller: 'homeCtrl'
    })
    .state('/aboutus',{
        url: "/aboutus",
        templateUrl: '/aboutus.html',
        controller: 'aboutusCtrl'
    })
    .state('/contactus',{
        url: "/contactus",
        templateUrl: 'contactus.html',
        controller: 'contactusCtrl'
    })
    .state('/features',{
        url: "/features",
        templateUrl: 'features.html',
        controller: 'featuresCtrl'
    })
    .state('/tos',{
        url: "/tos",
        templateUrl: 'tos.html',
        controller: 'tosCtrl'
    })
    .state('/privacy',{
        url: "/privacy",
        templateUrl: 'privacy.html',
        controller: 'privacyCtrl'
    })
    .state('/verify',{
        url: "/verify",
        templateUrl: 'verify.html',
        controller: 'verifyCtrl'
    });
    $locationProvider.html5Mode(true);
});
