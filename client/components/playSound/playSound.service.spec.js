'use strict';

describe('Service: playSound', function () {

  // load the service's module
  beforeEach(module('pomodoreApp'));

  // instantiate service
  var playSound;
  beforeEach(inject(function (_playSound_) {
    playSound = _playSound_;
  }));

  it('should do something', function () {
    expect(!!playSound).toBe(true);
  });

});
