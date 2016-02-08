'use strict';

(function() {

/**
 * MainController()
 * The MainController controls the interval in the pomodore app
 * @param {function} $interval The interval component
 */
function MainController ($interval) {
  var vm = this;
  var interval, counter, repeats, paused;

  // Models
  vm.playing  = false;
  vm.counter  = 0;
  vm.progress = 100;
  vm.start    = start;
  vm.pause    = pause;
  vm.stop     = stop;


  // Methods
  /**
   * start()
   * Start new interval
   * @param  {boolean} newInterval  Wether or not it's a new interval
   * @param  {number}  time         The minutes to count down
   */
  function start (newInterval, time) {
    if (newInterval) {
      $interval.cancel(interval);     // Kill any ongoing interval if starting new interval

      counter     = time * 60 * 1000; // Translate minutes to millisconds
      vm.counter  = counter;          // Set the counter to toight amount of minutes
      vm.progress = 100;              // Set progress to 100 percent
    }

    paused = false;    // In this case the interval is running
    vm.playing = true; // Set playing = true

    // Starts or resumes the interval
    interval = $interval(() => {
      vm.counter  -= 1000;                         // Subtract one second from vm.counter
      vm.progress  = (vm.counter / counter) * 100; // Subtract correct precentage from vm.progress

      // Kill process if reaching countdown i done
      if (vm.counter < 1) {
        finished();
      }
    }, 1000);
  }

  /**
   * pause()
   * Pause or resume the running interval
   */
  function pause () {
    if (paused) {
      start(false);               // Resume the "old" interval
    } else {
      $interval.cancel(interval); // Pause the interval
      paused = true;              // Set paused = true
    }
  }

  /**
   * stop()
   * Stop the running interval
   * Resets everything to start
   */
  function stop () {
    $interval.cancel(interval); // Stop running interval
    vm.playing  = false; // Reset playing
    vm.counter  = 0;     // Reset counter
    vm.progress = 100;     // Reset progress
  }

  /**
   * finished()
   * Function called when the countdown has reached zero
   * Resets everything to start
   *
   * TODO: Call an alarm sound when counter is finished
   */
  function finished () {
    $interval.cancel(interval); // Stop running interval
    vm.playing  = false; // Reset playing
    vm.counter  = 0;     // Reset counter
    vm.progress = 100;     // Reset progress
  }
}

angular.module('pomodoreApp')
  .controller('MainController', MainController);

})();
