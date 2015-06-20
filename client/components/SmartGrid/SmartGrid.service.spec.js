'use strict';

describe('Service: SmartGrid', function () {

  // load the service's module
  beforeEach(module('cloudchiveApp'));

  // instantiate service
  var SmartGrid;
  beforeEach(inject(function (_SmartGrid_) {
    SmartGrid = _SmartGrid_;
  }));

  it('should do something', function () {
    expect(!!SmartGrid).toBe(true);
  });

});
