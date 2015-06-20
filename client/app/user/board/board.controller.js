'use strict';

angular.module('cloudchiveApp')
  .controller('BoardCtrl', function ($scope, $stateParams, Auth, Link, Board, Comment, $window, $interval, Helpers, SmartGrid) {
  	
    $scope.cols = {};

    Auth.getCurrentUser().$promise.then(function(user){
      $scope.user = user;
      console.log($scope.user);
    });

    Board.getOne($stateParams.id).then(function(res){
      $scope.board = res.data;
      $scope.cols = SmartGrid.make($scope.board.links);
      console.log($scope.cols);
    });

    $scope.newUrl = {};
    $scope.newLinkComment = {};
    $scope.newBoardComment = {};

    

  	$scope.addLink = function () {
      var url = $scope.newUrl.url;
      var counter = 0;
      $scope.newUrl.url = 'fetching your link ';
      var stop = $interval(function() {
            if (counter < 2) {
              $scope.newUrl.url += '.';
              counter++; 
            } else {
               $scope.newUrl.url = 'fetching your link ';
               counter = 0;
            }
          }, 200);


      
      Link.add(url, $scope.board._id).then(function(link){
        SmartGrid.add($scope.cols, link.data);
        console.log($scope.cols);

        $scope.board.links.push(link.data);
        $scope.board.__v++;
        $scope.user.links.push(link.data._id);
        $interval.cancel(stop);
        stop = undefined;
        $scope.newUrl.url = '' ;
      });
  	};

    

    $scope.openLink = function (url) {
      $window.open(url);
    };

    $scope.updateBoard = function () {
      console.log("the board we send", $scope.board);
      Board.update($scope.board).then(function(res){
        console.log(res.data);
      });
    };

    $scope.updateBoardMeta = function () {
      Board.updateMeta({id: $scope.board._id, title: $scope.board.title, description: $scope.board.description}).then(function(res){
        $scope.board.title = res.data.title;
        $scope.board.description = res.data.description;
      })
    }

    $scope.updateLink = function (link) {
      Link.update(link).then(function(res){
        console.log(res.data);
      });
    };

    $scope.createLinkComment = function (link) {
      var comment = {
        text: link.newComment,
        author: $scope.user._id,
        targetLink: link._id,
        createdOn: Date.now()
      };
      comment.targetAuthors = Helpers.grab($scope.board.authors, '_id');
      Comment.createOnLink(comment).then(function(res){
        console.log('this is the res', res);
        delete link.newComment;
        link.comments.push(res.data);
      });
    };

    $scope.removeLink = function (index) {
      Helpers.removeOne($scope.board.links, index)
      $scope.updateBoard();
    }
  
    
 

  });
