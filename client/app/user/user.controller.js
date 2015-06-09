'use strict';

angular.module('cloudchiveApp')
  .controller('UserCtrl', function ($scope, $stateParams, Auth, Link, Board) {
  	
    Board.getByUser($stateParams.id).then(function(boards){
      $scope.board = boards.data[0];
    })

  

  	$scope.addLink = function () {

  	}

    $scope.createBoard = function() {
      Board.create($stateParams.id, {}).then(function(board) {
        $scope.board = board.data;
      })
    }

  });
