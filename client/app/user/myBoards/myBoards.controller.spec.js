'use strict';

describe('Controller: MyBoardsCtrl', function () {

  // load the controller's module
  beforeEach(module('cloudchiveApp'));

  var MyBoardsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyBoardsCtrl = $controller('MyBoardsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
