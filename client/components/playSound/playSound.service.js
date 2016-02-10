'use strict';

angular.module('pomodoreApp')
  .factory('playSound', function () {
    ion.sound({
      sounds: [
        {
          name: 'alarm',
          loop: 3
        }
      ],
      path: 'assets/audio/',
      preload: true,
    });

    // Public API here
    return {
      alert: function () {
        return ion.sound.play('alarm');
      }
    };
  });
