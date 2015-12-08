'use strict';

/**
 * @ngdoc function
 * @name pomodoreApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pomodoreApp
 */
angular.module('pomodoreApp')
  .controller('MainCtrl', function ($scope, $interval) {
    var vm = this;
    var stop;
    var soundLoop = 1;
    var alarm = new Howl({
      urls: ['audio/alarm.mp3'],
      autoplay: false,
      loop: false,
      onend: function () {
        if(soundLoop > 0) {
          soundLoop -= 1;
          alarm.play();
        } else {
          alarm.stop();
        }
      }
    });

    vm.timer    = 0;
    vm.progress = 100;
    vm.playing  = false;

    vm.pomodore = function (value, newTimer) {
      vm.playing = true;
      vm.paused = 'Pause';

      if (angular.isDefined(stop)) { return; }

      if (newTimer || vm.timer === 0) {
        vm.timer = value;
        vm.part = 100/(value/1000);
      }

      stop = $interval(function () {
        if (vm.timer > 0) {
          vm.progress -= vm.part;
          vm.timer -= 1000;
        } else {
          alarm.play();
          window.navigator.vibrate(200);
          vm.stopPomodore();
          vm.resetPomodore();
        }
      }, 1000);
    };

    vm.stopPomodore = function () {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        vm.paused = 'Resume';
        stop = undefined;
      } else {
        vm.pomodore(0, false);
      }
    };

    vm.resetPomodore = function () {
      vm.timer = 0;
      vm.progress = 100;
      vm.playing = false;
    };

    $scope.$on('$destroy', function () {
      vm.stopTimer();
    });
  });
