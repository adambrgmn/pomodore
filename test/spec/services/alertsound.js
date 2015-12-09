'use strict';

describe('Service: alertSound', function () {

  // load the service's module
  beforeEach(module('pomodoreApp'));

  // instantiate service
  var alertSound;
  beforeEach(inject(function (_alertSound_) {
    alertSound = _alertSound_;
  }));

  it('should do something', function () {
    expect(!!alertSound).toBe(true);
  });

});
