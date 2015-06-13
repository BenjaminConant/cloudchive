'use strict';

angular.module('cloudchiveApp')
  .factory('Helpers', function () {
    return {
      grab: function (arrayOfObjects, prop) {
        var arrayOfProps = [];
        arrayOfObjects.forEach(function(obj){
          var p = obj[prop];
          if (p) {arrayOfProps.push(p);}
        });
        return arrayOfProps;
      },
      removeOne: function(array, idx) {
          array.splice(idx, 1);
      }, 
      removeMatch: function(array, match) {
        var removeIdx;
        var remove = false;
        array.forEach(function(elm, idx) {
          console.log("elm", elm, "match", match);
          if (elm === match) {
            removeIdx = idx;
            remove = true;
            console.log("got to elm match case");
          }
        });
        if (remove) {array.splice(removeIdx, 1);}
      }
    };
  });
