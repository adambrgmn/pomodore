'use strict';

/**
 * @ngdoc service
 * @name pomodoreApp.alertSound
 * @description
 * # alertSound
 * Factory in the pomodoreApp.
 */
angular.module('pomodoreApp')
  .factory('alertSound', function () {
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
