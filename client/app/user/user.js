'use strict';

angular.module('cloudchiveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/:id',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });