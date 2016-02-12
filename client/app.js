'use strict';

angular.module('pomodore', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngAnimate'
])
  .config(function ($routeProvider, $locationProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

  });
