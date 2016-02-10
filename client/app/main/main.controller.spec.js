'use strict';

describe('Controller: MainController', function() {

  // load the controller's module
  beforeEach(module('pomodoreApp'));
  beforeEach(module('stateMock'));

  var scope;
  var MainController;
  var state;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope, $state) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    state = $state;
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should play a timer when running fn start()', function() {
    expect(MainController.playing).toBe(false);
    MainController.start(true, 1);
    expect(MainController.playing).toBe(true);
  });
});