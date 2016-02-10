'use strict';

angular.module('pomodoreApp')
  .filter('timeFilter', function () {
    return function (input) {
      let min = Math.floor((input/1000/60) % 60);
      let sec = Math.floor((input/1000) % 60);

      if (min < 10) {
        min = '0' + min;
      }

      if (sec < 10) {
        sec = '0' + sec;
      }

      if (min === '00' && sec === '00') {
        min = '--';
        sec = '--';
      }

      return min + ':' + sec;
    };
  });
