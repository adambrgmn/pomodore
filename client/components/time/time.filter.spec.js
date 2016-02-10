'use strict';

describe('Filter: timeFilter', function () {

  // load the filter's module
  beforeEach(module('pomodoreApp'));

  // initialize a new instance of the filter before each test
  var time;
  beforeEach(inject(function ($filter) {
    time = $filter('timeFilter');
  }));

  it('should return the input parsed to "minutes:seconds" (padded if less than 10)', function () {
    var milliseconds = 61000;
    expect(time(milliseconds)).toBe('01:01');
  });

});
