'use strict';

describe('Filter: floor', function () {

  // load the filter's module
  beforeEach(module('pomodoreApp'));

  // initialize a new instance of the filter before each test
  var floor;
  beforeEach(inject(function ($filter) {
    floor = $filter('floor');
  }));

  it('should return the input floored down', function () {
    var text = 1.3;
    expect(floor(text)).toBe(1);
  });

});
