'use strict';

angular.module('cloudchiveApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, Board) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function(user) {
          Auth.getCurrentUser().$promise
          .then(function(user){
              $location.path('/user/' + user._id);
          })
         
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
