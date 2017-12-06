/*
 * client/js/pharmacy/services/pharmacyService.js
 */

'use strict';

// Public API

    angular.module('AuthService', [])

        .factory('AuthService', function ($rootScope) {
           
            var self = {};
            var user ={};
             var userDetails = {};
            self.store = function(value){
                userDetails = value;
            };
            self.retrive = function(){
                return userDetails;
            };

            self.userData = function(user){
                 $rootScope.user = user;
            };
           
           self.authuser = function(){
                return $rootScope.user;
            };


            return self;
        });
