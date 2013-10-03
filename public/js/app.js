'use strict';


// Declare app level module which depends on filters, and services
angular.module('contactApp', ['ui.bootstrap']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/contact/:id', {templateUrl: 'partial/contact', controller: ContactCtrl});
    $routeProvider.otherwise({redirectTo: '/'});
    $locationProvider.html5Mode(true);
  }]);
