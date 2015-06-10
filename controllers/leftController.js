workpieApp.controller('leftController', function ($scope) {
    'use strick';
    $scope.savedoc = function () {
        WorkPie.Editor.DocEditor.saveEditorContent();
    };
    $scope.loaddoc = function () {
    };
});
