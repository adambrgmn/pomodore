'use strict';

/**
 * @ngdoc filter
 * @name pomodoreApp.filter:time
 * @function
 * @description
 * # time
 * Filter in the pomodoreApp.
 */
angular.module('pomodoreApp')
  .filter('time', function () {
    return function (input) {
      var seconds = input/1000;
      var minutes = Math.floor(seconds/60);

      seconds = seconds - (minutes*60);

      if (minutes <= 9) {
        minutes = '0' + minutes;
      }
      if (seconds <= 9) {
        seconds = '0' + seconds;
      }

      return minutes + ':' + seconds;
    };
  });
