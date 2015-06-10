'use strict';

angular.module('cloudchiveApp')
  .controller('UserCtrl', function ($scope, $stateParams, Auth, Link, Board, $window, $interval) {
  	
    $scope.newUrl = {};

    Board.getByUser($stateParams.id).then(function(boards){
      $scope.board = boards.data[0];
      console.log($scope.board);
    })

  	$scope.addLink = function () {
      var url = $scope.newUrl.url
      var counter = 0;
      $scope.newUrl.url = "fetching your link "
      var stop = $interval(function() {
            if (counter < 2) {
              $scope.newUrl.url += '.'
              counter++; 
            } else {
               $scope.newUrl.url = "fetching your link ";
               counter = 0;
            }
          }, 200);


      
      Link.add(url, $scope.board._id).then(function(link){
        $scope.board.links.push(link.data);
        $interval.cancel(stop);
        stop = undefined;
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
