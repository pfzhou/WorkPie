/// <reference path="../typings/angular.d.ts"/>
/// <reference path="../typings/app.d.ts"/>

workpieApp.controller('leftController',function($scope) {
  $scope.savedoc = function(){
    console.log(editor.serialize());
  };
});
