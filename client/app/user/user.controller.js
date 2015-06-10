'use strict';

angular.module('cloudchiveApp')
  .controller('UserCtrl', function ($scope, $stateParams, Auth, Link, Board, $window) {
  	
    Board.getByUser($stateParams.id).then(function(boards){
      $scope.board = boards.data[0];
      console.log($scope.board);
    })

  

  	$scope.addLink = function (url) {
      Link.add(url, $scope.board._id).then(function(link){
        $scope.board.links.push(link.data);
      })
  	}

    $scope.createBoard = function() {
      Board.create($stateParams.id, {}).then(function(board) {
        $scope.board = board.data;
      })
    }

    $scope.openLink = function (url) {
      $window.open(url);
    }

  });
