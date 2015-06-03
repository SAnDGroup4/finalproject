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
  controller('Partial1', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Partial2', function ($scope) {
    
  }).
  controller('Home', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Addcourse', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Addtest', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Adduser', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Test', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Course', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Login', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('PersonalInfo', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('ShowStatistic', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Vedio', function ($rootScope, $scope, $location, $http) {
    
  });
