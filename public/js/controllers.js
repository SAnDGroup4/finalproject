'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute']).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http, $state, $location) {
    
    $rootScope.update=function(){
      $http({
        method: 'POST',
        url: '/token'
      }).
      success(function (data, status, headers, config) {
        $rootScope.token = data.access_token;
        $rootScope.isLogin = data.isLogin;
      }).
      error(function (data, status, headers, config) {
        $rootScope.token = 'Error!';
        $rootScope.isLogin = false;
      });
    };
    $rootScope.loadPicker=function(){
              var oauthToken = $rootScope.token;
              var pickerApiLoaded = false;
              function onApiLoad() {
                gapi.load('picker', {'callback': onPickerApiLoad});
              };
              function onPickerApiLoad() {
                pickerApiLoaded = true;
                createPicker();
              };
              function createPicker() {
                if (pickerApiLoaded) {
                  var picker = new google.picker.PickerBuilder().
                      addView(new google.picker.DocsView()).
                      addView(new google.picker.DocsUploadView()).
                      setOAuthToken(oauthToken).
                      setDeveloperKey('AIzaSyDaTJUsZ-Fz329lKw5tTcry4DZIq_5s_tY').
                      // setCallback(pickerCallback).
                      build();
                  picker.setVisible(true);
                }
              };
              function pickerCallback(data) {
                var url = 'nothing';
                if (data[google.picker.Response.ACTION] == google.picker.Action.PICKED) {
                  var doc = data[google.picker.Response.DOCUMENTS][0];
                  url = doc[google.picker.Document.URL];
                }
                var message = 'You picked: ' + url;
                document.getElementById('result').innerHTML = message;
              };
              onApiLoad();
            };
  }).
  controller('Home', function ($rootScope, $scope, $location, $http) {
    
  }).
  controller('Course', function ($rootScope, $window, $scope, $http, $state, $location) {
    // $http({
    //   method: 'GET',
    //   url: '/course/listcourses'
    // }).
    // success(function (data, status, headers, config) {
    //   $scope.courses = data;
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.cname = 'Error!';
    // });
    //$scope.courses={};

     $scope.$watch('semester', function(newValue, oldValue) {
      $http({
        method: 'GET',
        url: '/course/'+$scope.semester
      }).
      success(function (data, status, headers, config) {
        $scope.courses = data;
      }).
      error(function (data, status, headers, config) {
        $scope.cname = 'Error!';
      });
    },true);
    $scope.$watch('course', function(newValue, oldValue) {
      $http({
        method: 'GET',
        url: '/coursename/'+$scope.course
      }).
      success(function (data, status, headers, config) {
        $scope.coursebyname = data;
      }).
      error(function (data, status, headers, config) {
        $scope.coursebyname = 'Error!';
      });
    },true);
  }).
  controller('Course2', function ($rootScope, $window, $scope, $http, $state, $location) {

  }).
  controller('Student', function ($rootScope, $window, $scope, $http, $state, $location) {

  }).
  controller('AddCourse', function ($rootScope, $window, $scope, $http, $state, $location) {

    //$scope.$watch('name', function(newValue, oldValue) {
    //  console.log($scope.name);
    //},true);

    $scope.addBook = function(){
      $http({

      method : 'POST',
      url: '/course/addcourse',
      data: {Course_name: $scope.courseName, Time : $scope.courseTime, 
            Classroom : $scope.classVenue, Note: 'English-taught class',
            year: '103', semester: '1'},
      //headers : {'Content-type' : 'application/json'} 
      }).
      success(function (data, status, headers, config) {
        $scope.courses = data;
      }).
      error(function (data, status, headers, config) {
        $scope.cname = 'Error!';
      });
      /*if(data.success)
      { 
      $scope.courses.push(data); 
       }

      }).error(function(data, status, headers, config){
        $scope.cname = 'Error!';
      //set error message.*/
    }
  }).
  controller('Archive', function ($rootScope, $scope, $location, $http) {
    $scope.$watch('semester', function(newValue, oldValue) {
      $http({
        method: 'GET',
        url: '/course/'+$scope.semester
      }).
      success(function (data, status, headers, config) {
        $scope.courses = data;
      }).
      error(function (data, status, headers, config) {
        $scope.cname = 'Error!';
      });
    },true);
    $scope.$watch('course', function(newValue, oldValue) {
      $http({
        method: 'GET',
        url: '/course/'+$scope.semester
      }).
      success(function (data, status, headers, config) {
        $scope.courses = data;
      }).
      error(function (data, status, headers, config) {
        $scope.cname = 'Error!';
      });
    },true);
  }).
  controller('PersonalInfo', function ($rootScope, $scope, $location, $http) {
    
  });
