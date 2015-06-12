'use strict';

angular.module('cloudchiveApp')
  .factory('Board', function ($http) {
  
    // Public API here
    return {
      create: function (userId, board) {
        return $http.post('/api/boards/', board);
      },
      getOne: function (boardId) {
        return $http.get('/api/boards/' + boardId);
      },
      getByUser: function (userId) {
      	return $http.get('/api/boards/getbyuser/' + userId);
      }, 
      update: function (board) {
        return $http.put('/api/boards/' + board._id, board);
      }
    };
  });
