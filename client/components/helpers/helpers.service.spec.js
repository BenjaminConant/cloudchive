'use strict';

describe('Service: helpers', function () {

  // load the service's module
  beforeEach(module('cloudchiveApp'));

  // instantiate service
  var helpers;
  beforeEach(inject(function (_helpers_) {
    helpers = _helpers_;
  }));

  it('should do something', function () {
    expect(!!helpers).toBe(true);
  });

});
