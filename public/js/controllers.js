'use strict';

/* Controllers */

angular.module('myApp.controllers', ['ngRoute']).
  controller('AppCtrl', function ($rootScope, $window, $scope, $http, $state, $location) {
    $rootScope.isLogin = $window.isLogin;
    $rootScope.name = $window.name;
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
    $rootScope.loadPicker=function(pid){
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
                      addView(new google.picker.DocsView().setIncludeFolders(true).setParent(pid)).
                      addView(new google.picker.DocsUploadView().setParent(pid)).
                      addView(google.picker.ViewId.RECENTLY_PICKED).
                      enableFeature(google.picker.Feature.MULTISELECT_ENABLED).
                      setOAuthToken(oauthToken).
                      setDeveloperKey('AIzaSyDaTJUsZ-Fz329lKw5tTcry4DZIq_5s_tY').
                      setCallback(pickerCallback).
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
                var message = 'You picked: <a href="' + url +'" target="_blank">' + url +'</a>';
                document.getElementById('result').innerHTML = message;
              };
              onApiLoad();
            };
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
    $scope.courses={};
    $scope.$watch('course', function(){},true);
    $scope.$watch('semester', function(newValue, oldValue) {
        $http({
          method: 'GET',
          url: '/course/'+newValue
        }).
        success(function (data, status, headers, config) {
          $scope.courses = data;
        }).
        error(function (data, status, headers, config) {
          $scope.cname = 'Error!';
        });
    },true);


  $scope.addBook = function(){
      $http({

      method : 'POST',
      url: '/course/addcourse',
      data: {Course_name: $scope.courseName, year: $scope.academicYear,
            semester: $scope.courseSemester, course_syllabus: $scope.syllabusURL,
            teacher: $scope.courseInstructor, Time : $scope.courseTime, 
            Classroom : $scope.classVenue
            , },
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
  controller('Course2', function ($rootScope, $window, $scope, $http, $state, $location) {

    // $http({
    //   method: 'GET',
    //   url: '/course/listcourse'
    // }).
    // success(function (data, status, headers, config) {
    //   $scope.courses = data;
    // }).
    // error(function (data, status, headers, config) {
    //   $scope.cname = 'Error!';
    // });
    // $scope.courses={};
    // $scope.$watch('semester', function(newValue, oldValue) {
    //     $http({
    //       method: 'GET',
    //       url: '/course/'+newValue
    //     }).
    //     success(function (data, status, headers, config) {
    //       $scope.courses = data;
    //     }).
    //     error(function (data, status, headers, config) {
    //       $scope.cname = 'Error!';
    //     });
    // },true);


  }).
  controller('Student', function ($rootScope, $window, $scope, $http, $state, $location) {
      //   $scope.addStudent = function(){
      // $http({

      // method : 'POST',
      // url: '/course/addcourse',
      // data: {student_ID: $scope.SID, name: $scope.studentName,
      //       major: $scope.studentMajor, grade: $scope.studentGrade
      //       , },
      // //headers : {'Content-type' : 'application/json'} 
      // }).
      // success(function (data, status, headers, config) {
      //   $scope.courses = data;
      // }).
      // error(function (data, status, headers, config) {
      //   $scope.cname = 'Error!';
      // });
  }).

  controller('AddStudent', function ($rootScope, $window, $scope, $http, $state, $location) {
    // $scope.addRecord = function(){
    //   $http({

    //   method : 'POST',
    //   url: '/course/addstudent',
    //   data: {student_ID: $scope.SID, name: $scope.studentName,
    //         major: $scope.studentMajor, grade: $scope.studentGrade
    //         , },
    //   //headers : {'Content-type' : 'application/json'} 
    //   }).
    //   success(function (data, status, headers, config) {
    //     $scope.courses = data;
    //   }).
    //   error(function (data, status, headers, config) {
    //     $scope.cname = 'Error!';
    //   });


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
            Classroom : $scope.classVenue, Note: $scope.note,
            year: $scope.courseYear, semester: $scope.courseSemester},
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
    },true);
  }).
  controller('PersonalInfo', function ($rootScope, $scope, $location, $http) {
    
  });

  controller('AddGroup', function ($rootScope, $scope, $location, $http) {
    
  });
