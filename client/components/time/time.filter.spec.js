'use strict';

describe('Filter: time', function () {

  // load the filter's module
  beforeEach(module('pomodoreApp'));

  // initialize a new instance of the filter before each test
  var time;
  beforeEach(inject(function ($filter) {
    time = $filter('time');
  }));

  it('should return the input parsed to "minutes:seconds" (padded if less than 10)', function () {
    var time = 61000;
    expect(time(time)).toBe('01:01');
  });

});
