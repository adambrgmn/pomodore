'use strict';

describe('Filter: time', function () {

  // load the filter's module
  beforeEach(module('pomodoreApp'));

  // initialize a new instance of the filter before each test
  var time;
  beforeEach(inject(function ($filter) {
    time = $filter('time');
  }));

  it('should return the input parsed to MM:SS', function () {
    var text = 61000;
    expect(time(text)).toBe('01:01');
  });

});
