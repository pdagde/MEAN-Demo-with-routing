/**
 * Created by Pravin on 12/04/17.
 */

angular.module('appMain',['appMainCtrl'])

.config(function($stateProvider) {
    $stateProvider

        .state('app.home', {
            url: "/home",
            templateUrl: "modules/main/template/main.html",
            controller: "HelloWordCtrl"
        })
});
