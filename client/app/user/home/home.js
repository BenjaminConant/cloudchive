'use strict';

angular.module('cloudchiveApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'app/user/home/home.html',
        controller: 'HomeCtrl'
      })
      .state('home.boards', {
      	url:'/boards',
      	templateUrl: 'app/user/home/boards/boards.html',
      	controller: 'BoardsCtrl'
      })
      .state('home.links', {
      	url:'/links',
      	templateUrl: 'app/user/home/links/links.html',
      	controller: 'LinksCtrl'
      });
  });