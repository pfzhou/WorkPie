/// <reference path="../typings/angular.d.ts"/>
/// <reference path="../app.ts"/>

//import app = require('../app');

//var workpieApp = app.workpieApp;
workpieApp.controller('docController',function($scope) {
  $scope.docTitle = {};
  console.log($scope.docTitle);
  console.log($scope.docContent);

  // $scope.savedoc = function(){
  //   console.log(editor.serialize());
  // };
});
