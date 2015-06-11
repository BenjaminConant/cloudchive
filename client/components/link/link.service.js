'use strict';

angular.module('cloudchiveApp')
  .factory('Link', function ($http) {
   
    return {
      add: function (url, boardId) {
        return $http.post('api/links/', {url: url, boardId: boardId});
      },
      update: function (link) {
        return $http.put('/api/links/' + link._id, link);
      }
    };
  });
