'use strict';

angular.module('cloudchiveApp')
  .controller('MyBoardsCtrl', function ($scope, Auth, Board, $location) {
   	Auth.getCurrentUser().$promise
   	.then(function(user){
   		$scope.user = user;
   		return user;
   	})
   	.then(function(user){
   		Board.getByUser(user._id).then(function(res){
      		$scope.boards = res.data;
          console.log($scope.boards);
    	})
   	})

    $scope.createBoard = function() {
      Board.create($scope.user._id, {}).then(function(res) {
      	$scope.goToBoard(res.data._id);
      })
    }

    $scope.goToBoard = function(id) {
    	$location.path('user/board/' + id)
    }

  });
