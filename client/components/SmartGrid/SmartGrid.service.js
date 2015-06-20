'use strict';

angular.module('cloudchiveApp')
  .factory('SmartGrid', function () {
    
    return {
      make: function (itemsArray) {
        var grid = [];
        var counter = 0
        itemsArray.forEach(function(item, index){
          if (!grid[counter]) {grid[counter] =[]};
          grid[counter].push(item);
          if (counter === 3) {
              counter = 0;
          } else {
              counter++;
          }
        });
        return grid;
      },
      add: function (grid, item) {
        
        if (!grid[0]) {grid[0] = [item]; return;}
        console.log("funciton called");
        
        var lastLength = 0;
        var counter = 0;
        for (var i = 0; i <= grid.length; i++) { 
          console.log("looping", counter);
          if (!grid[counter]) {
            console.log("in here");
            grid[counter] = [item];
            return;
          }
          if (counter === 3 ) {
            console.log("ll from 4", lastLength)
            if (lastLength !== grid[counter].length) {
              console.log("in here");
              grid[counter].push(item);
              return;
            } else {
              console.log("in here");
              grid[0].push(item);
              return;
            } 
           }
          if (counter === 0) {
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
          console.log("at the end of loop counter", counter, "lastLength", lastLength);
        }



      },

      remove: function () {

      }
    };
  });
