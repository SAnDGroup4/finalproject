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
    state('addcourse', {
      url:'/addcourse',
      templateUrl: 'partial/addcourse',
      controller: 'Addcourse'
    }).
    state('addtest', {
      url:'/addtest',
      templateUrl: 'partial/addtest',
      controller: 'Addtest'
    }).
    state('adduser', {
      url:'/adduser',
      templateUrl: 'partial/adduser',
      controller: 'Adduser'
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
    state('showstatistic', {
      url:'/showstatistic',
      templateUrl: 'partial/showstatistic',
      controller: 'ShowStatistic'
    }).
    state('test', {
      url:'/test',
      templateUrl: 'partial/test',
      controller: 'Test'
    }).
    state('vedio',{
      url:'/vedio',
      templateUrl: 'partial/vedio',
      controller: 'Vedio'
     }).
    state('partial1',{
      url:'/partial1',
      templateUrl: 'partial/partial1',
      controller: 'Partial1'
     }).
    state('partial2',{
      url:'/partial2',
      templateUrl: 'partial/partial2',
      controller: 'Partial2'
     }).
    state('otherwise',{
      url: "/"
    })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}]);