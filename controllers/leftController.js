/// <reference path="../typings/angular.d.ts"/>
/// <reference path="../app.ts"/>
//import app = require('../app');
//var workpieApp = app.workpieApp;
workpieApp.controller('leftController', function ($scope) {
    $scope.savedoc = function () {
        console.log(editor.serialize());
    };
});
