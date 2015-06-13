'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute']).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http, $state, $location) {
    $rootScope.isLogin = $window.isLogin;
    // $http({
    //   method: 'GET',
    //   url: '/api/name'
    // }).
    // success(function (data, status, headers, config) {
    //   $scope.name = data.name;
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.name = 'Error!';
    // });

  }).
  controller('Home', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Course', function ($rootScope, $window, $scope, $http, $state, $location) {
    $http({
      method: 'GET',
      url: '/course/listcourses'
    }).
    success(function (data, status, headers, config) {
      $scope.courses = data;
    }).
    error(function (data, status, headers, config) {
      $scope.cname = 'Error!';
    });
  }).
  controller('Course2', function ($rootScope, $window, $scope, $http, $state, $location) {

  }).
  controller('Student', function ($rootScope, $window, $scope, $http, $state, $location) {

  }).
  controller('AddCourse', function ($rootScope, $window, $scope, $http, $state, $location) {

  }).
  controller('Archive', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('PersonalInfo', function ($rootScope, $scope, $location, $http) {
    
  });
