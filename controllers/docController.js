workpieApp.controller('docController', function ($scope, $sce) {
    'use strick';
    $scope.docEditor = {};
    $scope.docEditor.title = '';
    $scope.docEditor.content = '';
    var editor = WorkPie.Editor;
    $scope.changeTitle = function () {
        if (editor.DocEditor.docInfo == null) {
            editor.DocEditor.docInfo = new editor.DocInfo();
            editor.DocEditor.infoChanged = true;
        }
        editor.DocEditor.docInfo.title = $scope.docEditor.title;
        editor.DocEditor.docInfo.modifyTime = new Date();
    };
    $scope.getAttachments = function () {
        var result = [];
        if (editor.DocEditor.docInfo) {
            result = _.clone(editor.DocEditor.docInfo.attachments);
        }
        console.log('!!!!!!!!!!附件个数=' + result.length);
        return result;
    };
    $scope.files = [];
    $scope.$on('refreshAttachments', function (event, message) {
        $scope.files = $scope.getAttachments();
    });
});
