'use strict';

describe('Service: link', function () {

  // load the service's module
  beforeEach(module('cloudchiveApp'));

  // instantiate service
  var link;
  beforeEach(inject(function (_link_) {
    link = _link_;
  }));

  it('should do something', function () {
    expect(!!link).toBe(true);
  });

});
