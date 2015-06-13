'use strict';

angular.module('cloudchiveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('board', {
        url: '/board/:id',
        templateUrl: 'app/user/board/board.html',
        controller: 'BoardCtrl'
      });
  });