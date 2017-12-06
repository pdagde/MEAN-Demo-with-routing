/**
 * Created by Pravin on 12/04/17.
 */

'use strict';

var App = angular.module('calenderCode',['ui.router','appIndex']);

App.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
				$urlRouterProvider.otherwise("/app/signUp");
				
				$stateProvider
                    .state('app', {
                        url: "/app",
                        abstract: true
                    })
			}]);
