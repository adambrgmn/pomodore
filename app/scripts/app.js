'use strict';

/**
 * @ngdoc overview
 * @name pomodoreApp
 * @description
 * # pomodoreApp
 *
 * Main module of the application.
 */
angular
  .module('pomodoreApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
