'use strict';

describe('Factory: PlaySound', function () {

  beforeEach(module('pomodore'));

  var PlaySound;

  beforeEach(inject(function (_PlaySound_) {
    PlaySound = _PlaySound_;
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
