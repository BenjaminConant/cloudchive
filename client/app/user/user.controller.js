'use strict';

angular.module('cloudchiveApp')
  .controller('UserCtrl', function ($scope, $stateParams, Auth, Link, Board, $window) {
  	
    $scope.newUrl = {};

    Board.getByUser($stateParams.id).then(function(boards){
      $scope.board = boards.data[0];
      console.log($scope.board);
    })

  

  	$scope.addLink = function () {
      Link.add($scope.newUrl.url, $scope.board._id).then(function(link){
        $scope.board.links.push(link.data);
        $scope.newUrl.url = "" ;
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
