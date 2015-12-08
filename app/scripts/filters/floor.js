'use strict';

/**
 * @ngdoc filter
 * @name pomodoreApp.filter:floor
 * @function
 * @description
 * # floor
 * Filter in the pomodoreApp.
 */
angular.module('pomodoreApp')
  .filter('floor', function () {
    return function (input) {
      if (input < 0) {
        return 0;
      } else {
        return Math.floor(input);
      }
    };
  });
