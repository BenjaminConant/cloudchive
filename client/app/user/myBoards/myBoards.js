'use strict';

angular.module('cloudchiveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('myBoards', {
        url: '/user/myBoards',
        templateUrl: 'app/user/myBoards/myBoards.html',
        controller: 'MyBoardsCtrl'
      });
  });