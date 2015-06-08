//import appEditor = require('../modules/appEditor');
workpieApp.controller('leftController', function ($scope) {
    $scope.savedoc = function () {
        appEditor.DocEditor.saveEditorContent();
    };
});
