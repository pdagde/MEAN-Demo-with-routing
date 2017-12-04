/**
 * Created by Pravin on 12/04/17.
 */


angular.module('appBlog',['appBlogCtrl'])
    .config(function($stateProvider) {
        $stateProvider

            .state('app.blog', {
                url: "/blog",
                templateUrl: "modules/blog/template/blog.html",
                controller : "BlogCtrl"
            })
    });
