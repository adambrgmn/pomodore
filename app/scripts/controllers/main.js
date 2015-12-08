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
    vm.stop     = undefined;
    vm.progress = 100;
    vm.playing  = false;
    vm.switchOn = 'paused';

    vm.pomodore = function (value, newTimer) {
      vm.switchOn = 'playing';
      vm.paused = 'Pause';

      if (angular.isDefined(vm.stop)) { return; }

      if (newTimer || vm.timer === 0) {
        vm.timer = value;
        vm.part = 100/(value/1000);
      }

      vm.stop = $interval(function () {
        if (vm.timer > 0) {
          vm.progress -= vm.part;
          vm.timer -= 1000;
        } else {
          alarm.play();
          vm.stopPomodore();
          vm.resetPomodore();
        }
      }, 1000);
    };

    vm.stopPomodore = function () {
      if (angular.isDefined(vm.stop)) {
        $interval.cancel(vm.stop);
        vm.paused = 'Resume';
        vm.stop = undefined;
      } else {
        vm.pomodore(0, false);
      }
    };

    vm.resetPomodore = function () {
      vm.timer = 0;
      vm.progress = 100;
      vm.switchOn = 'paused';
    };

    $scope.$on('$destroy', function () {
      vm.stopTimer();
    });
  });
