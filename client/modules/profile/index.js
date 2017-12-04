
/**
 * Created by Pravin on 4/8/17.
 */
angular.module('appProfile',['appProfileController'])

    .config(function($stateProvider) {
        $stateProvider
            .state('app.profile', {
                url: "/profile",
                templateUrl: "modules/profile/template/profile.html",
                controller: "ProfileCtrl"
            })
    });

