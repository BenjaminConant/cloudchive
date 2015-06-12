'use strict';

angular.module('cloudchiveApp')
  .factory('Comment', function ($http) {
  
    return {
      createOnLink: function (comment) {
        return $http.post('/api/comments/', comment);
      }
    };
  });
