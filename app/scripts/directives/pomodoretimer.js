'use strict';

/**
 * @ngdoc directive
 * @name pomodoreApp.directive:pomodoreTimer
 * @description
 * # A pomodore timer
 */
angular.module('pomodoreApp')
  .directive('pomodoreTimer', pomodoreTimer);

/**
 * pomodoreTimer
 * The directive function
 * @return {object} returns the directive
 */
function pomodoreTimer () {
  return {
    templateUrl: 'views/pomodoretimer.html',
    restrict: 'E',
    scope: {},
    controller: PomodoreTimerCtrl,
    controllerAs: 'vm',
    bindToController: true,
    // link: postLink
  };

  // function postLink (scope, element, attrs) {
  //   // element.text('this is the pomodoreTimer directive');
  // }
}


/**
 * Controller
 */
PomodoreTimerCtrl.$inject = ['$interval', 'alertSound'];
function PomodoreTimerCtrl ($interval, alertSound) {
  var vm = this;

  /**
   * All objects available in view
   */
  vm.timer         = 0;
  vm.progress      = 100;
  vm.playing       = false;
  vm.pauseResume   = 'Pause';
  vm.playPomodore  = playPomodore;
  vm.pausePomodore = pausePomodore;
  vm.resetPomodore = resetPomodore;

  /**
   * Variables for the following funcitons to work
   */
  var stop;
  var currentTimer = 0;

  /**
   * playPomodore
   * @description A function to play a new, or resume an old pomodore
   * @param  {boolean} newTimer If its a new timer (true) or if it should be resume a paused play (false)
   * @param  {number}  value    The value of the time, set in milliseconds
   */
  function playPomodore (newTimer, value) {
    if(angular.isDefined(stop)) {return;}

    if (newTimer) {
      currentTimer = value;
      vm.timer     = value;
    }

    vm.playing     = true;
    vm.pauseResume = 'Pause';

    stop = $interval(function () {
      if (vm.timer > 0) {
        vm.timer   -= 1000;
        vm.progress = (vm.timer / currentTimer) * 100;
      } else {
        vm.resetPomodore();
        alertSound.playAlert();
      }
    }, 1000);
  }

  /**
   * pausePomodore
   * @description pause current pomodore, or resume if already paused
   */
  function pausePomodore () {
    if(angular.isDefined(stop)) {
      $interval.cancel(stop);
      stop           = undefined;
      vm.pauseResume = 'Resume';
    } else {
      vm.playPomodore(false);
      vm.pauseResume = 'Pause';
    }
  }

  /**
   * resetPomodore
   * @description Reset the timer
   */
  function resetPomodore () {
    vm.timer    = 0;
    vm.progress = 100;
    vm.playing  = false;
    vm.pausePomodore();
  }
}
