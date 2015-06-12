'use strict';

angular.module('cloudchiveApp')
  .controller('LinksCtrl', function ($scope, Auth, Board, Link, $location) {
    Auth.getCurrentUser().$promise.then(function(user){
    	$scope.user = user;
    	Link.getMany(user.links).then(function(res){
    		$scope.links = res.data;
    		console.log($scope.links);
    	})
    })
  });
