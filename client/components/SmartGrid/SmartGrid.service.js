'use strict';

angular.module('cloudchiveApp')
  .factory('SmartGrid', function () {
    
    return {
      make: function (itemsArray) {
        var grid = [];
        var counter = 1
        itemsArray.forEach(function(item, index){
          if (!grid[counter]) {grid[counter] =[]};
          grid[counter].push(item);
          if (counter === 4) {
              counter = 1;
          } else {
              counter++;
          }
        });
        return grid;
      },
      add: function (grid, item) {
        


        
        var lastLength = 0;
        var counter = 1;
        console.log("funciton called");
        for (var i = 0; i < grid.length; i++) { 
          console.log("looping", counter);
          if (!grid[counter]) {
            console.log("in here");
            grid[counter] = [item];
            return;
          }
          if (counter === 4 ) {
            console.log("ll from 4", lastLength)
            if (lastLength !== grid[counter].length) {
              console.log("in here");
              grid[counter].push(item);
              return;
            } else {
              console.log("in here");
              grid['1'].push(item);
              return;
            } 
           }
          if (counter === 1) {
            console.log("in here");
            lastLength = grid[counter].length
            counter++;
          } else {
            console.log("in here");
            if (lastLength !== grid[counter].length) {
              console.log("in here");
              grid[counter].push(item);
              return;
            } else {
              console.log("in here");
              counter++;
            }
          }
        }
      },

      remove: function () {

      }
    };
  });
