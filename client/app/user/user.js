'use strict';

angular.module('cloudchiveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userBoard', {
        url: '/user/board/:id',
        templateUrl: 'app/user/user.html',
        controller: 'UserCtrl'
      });
  });