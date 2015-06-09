'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.router'
])
.config(['$routeProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider', function($routeProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
  
  $stateProvider.
    state('index', {
      url:'/',
      templateUrl: 'partial/home',
      controller: 'Home'
    }).
    state('course', {
      url:'/course',
      templateUrl: 'partial/course',
      controller: 'Course'
    }).
    state('login', {
      url:'/login',
      templateUrl: 'partial/login',
      controller: 'Login'
    }).
    state('personalinfo', {
      url:'/personalinfo',
      templateUrl: 'partial/personalinfo',
      controller: 'PersonalInfo'
    }).
    state('otherwise',{
      url: "/"
    })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}]);