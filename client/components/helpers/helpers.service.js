'use strict';

angular.module('cloudchiveApp')
  .factory('Helpers', function () {
    return {
      grab: function (arrayOfObjects, prop) {
        var arrayOfProps = [];
        arrayOfObjects.forEach(function(obj){
          var p = obj[prop];
          if (p) {arrayOfProps.push(p)}
        })
        return arrayOfProps;
      }
    };
  });
