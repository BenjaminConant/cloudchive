'use strict';

angular.module('cloudchiveApp')
  .controller('BoardsCtrl', function ($scope, Auth, Board, $location, Helpers) {
    Auth.getCurrentUser().$promise
    .then(function(user){
      $scope.user = user;
      console.log("user", $scope.user);
      return user;
    })
    .then(function(user){
      return Board.getByUser(user._id);
    })
    .then(function(res){
        $scope.boards = res.data;
        console.log("the boards", $scope.boards);
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
      $location.path('board/' + id);
    };

    $scope.removeBoard = function (boardId, idx) {
      Board.remove(boardId).then(function(res){
        console.log(res.data);
        Helpers.removeMatch($scope.user.boards, boardId);
        Helpers.removeOne($scope.boards, idx)
      });
    };

  });
