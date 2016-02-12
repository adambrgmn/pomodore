'use strict';

describe('time filter', function () {

  beforeEach(module('pomodore'));

  var time;

  beforeEach(inject(function ($filter) {
    time = $filter('time');
  }));

  it('should ...', function () {
    var text = 'bangular is awesome';
    expect(time(text)).toBe(text);
  });

});
