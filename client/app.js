'use strict';

angular.module('pomodore', [
  'ngRoute',
  'ngCookies',
  'ngResource',
  'ngAnimate',
  'angular-google-analytics'
])
  .config(function ($routeProvider, $locationProvider, AnalyticsProvider) {

    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    AnalyticsProvider.setAccount('UA-71140948-1');

  });
