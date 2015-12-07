'use strict';

describe('Filter: floor', function () {

  // load the filter's module
  beforeEach(module('pomodoreApp'));

  // initialize a new instance of the filter before each test
  var floor;
  beforeEach(inject(function ($filter) {
    floor = $filter('floor');
  }));

  it('should return the input prefixed with "floor filter:"', function () {
    var text = 'angularjs';
    expect(floor(text)).toBe('floor filter: ' + text);
  });

});
