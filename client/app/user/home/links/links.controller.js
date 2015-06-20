'use strict';

angular.module('cloudchiveApp')
  .controller('LinksCtrl', function ($scope, Auth, Link, SmartGrid) {
    $scope.cols = {};
    Auth.getCurrentUser().$promise
    .then(function(user){
		$scope.user = user;
		return Link.getMany(user.links);
    })
    .then(function(res){
		$scope.links = res.data;
		$scope.cols = SmartGrid.make($scope.links);
		console.log($scope.links);
		return $scope.links;
	})
	.then(null, function(err){
		if (err) {console.log(err);}
	});
  });
