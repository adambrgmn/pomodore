'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pomodoreApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope,
      // place here mocked dependencies
    });
  }));

  it('should define MainCtrl.stop after running pomodore function', function () {
    expect(MainCtrl.stop).toBeUndefined();
    MainCtrl.pomodore();
    expect(MainCtrl.stop).toBeDefined();
  });
});
