'use strict';

angular.module('cloudchiveApp')
  .controller('HomeCtrl', function ($scope, Auth, Board, $location) {
    Auth.getCurrentUser().$promise
   	.then(function(user){
   		$scope.user = user;
   		return user;
   	})
    .then(null, function(err){
      if (err) {console.log(err);}
    });

    $scope.createBoard = function() {
      Board.create($scope.user._id, {}).then(function(res) {
      	$scope.user.boards.push(res.data._id);
      	$scope.goToBoard(res.data._id);
      });
    };

    $scope.goToBoard = function(id) {
    	$location.path('user/board/' + id);
    };

  });
