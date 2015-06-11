'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute']).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http, $state, $location) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }).
  controller('Home', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Course', function ($rootScope, $window, $scope, $http, $state, $location) {
    $http({
      method: 'GET',
      url: '/course/2014/2'
    }).
    success(function (data, status, headers, config) {
      $scope.cname = data[0].CNAME;
    }).
    error(function (data, status, headers, config) {
      $scope.cname = 'Error!';
    });
  }).
  controller('Course2', function ($rootScope, $window, $scope, $http, $state, $location) {

  }).
  controller('Archive', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('PersonalInfo', function ($rootScope, $scope, $location, $http) {
    
  });
