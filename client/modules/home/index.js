/**
 * Created by Pravin on 12/04/17.
 */


angular.module('appHome',['appHomeCtrl'])
    .config(function($stateProvider) {
        $stateProvider

            .state('app.home', {
                url: "/home",
                templateUrl: "modules/home/template/home.html",
                controller : "homeCtrl"
            })
    });
