'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'ui.router',
  'ngCookies'
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
    state('course2',{
      url: "/course2",
      templateUrl: 'partial/course2',
      controller: 'Course2'
    }).
    state('addcourse',{
      url: "/addcourse",
      templateUrl: 'partial/addcourse',
      controller: 'Course'
    }).
    state('student',{
      url: "/student",
      templateUrl: 'partial/student',
      controller: 'Student'
    }).
    state('archive', {
      url:'/archive',
      templateUrl: 'partial/archive',
      controller: 'Archive'
    }).
    state('personalinfo', {
      url:'/personalinfo',
      templateUrl: 'partial/personalinfo',
      controller: 'PersonalInfo'
    }).
    state('addstudent', {
      url:'/addstudent',
      templateUrl: 'partial/addstudent',
      controller: 'AddStudent'
    }).
    state('addgroup', {
      url:'/addgroup',
      templateUrl: 'partial/addgroup',
      controller: 'AddGroup'
    }).
    state('otherwise',{
      url: "/"
    })

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
}]);