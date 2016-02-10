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
      path: 'audio/',
      preload: true,
    });

    // Public API here
    return {
      playAlert: function () {
        return ion.sound.play('alarm');
      }
    };
  });
