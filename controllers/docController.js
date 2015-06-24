workpieApp.controller('docController', function ($scope, $sce) {
    'use strick';
    $scope.docEditor = {};
    $scope.docEditor.title = '';
    $scope.docEditor.content = '';
    $scope.files = [];
    $scope.selectedfileid = '';
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
            for (var i = 0; i < editor.DocEditor.docInfo.attachments.length; i++) {
                result.push(_.clone(editor.DocEditor.docInfo.attachments[i]));
            }
        }
        console.log('加载附件个数=' + result.length, result, editor.DocEditor.docInfo);
        return result;
    };
    $scope.$on('refreshAttachments', function (event, message) {
        $scope.files = $scope.getAttachments();
    });
    $scope.getSize = function (filesize) {
        return formatFilesize(filesize);
    };
    $scope.getTime = function (time) {
        return formatDate(time, 'yyyy-MM-dd hh:mm:ss');
    };
    $scope.getFileType = function (fileext) {
        var filetype = mapFileType(fileext);
        var result = 'file-o';
        if (filetype)
            result = 'file-' + filetype + '-o';
        return 'fa-' + result;
    };
    $scope.openFile = function (file) {
        var fileFullPath = workpieConfig.dataPath + workpieConfig.docFolder + file.filePath;
        var shell = require('nw.gui').Shell;
        shell.openItem(fileFullPath);
    };
    $scope.selectedFile = function (file) {
        $scope.selectedfileid = file.id;
    };
    $scope.listkeyup = function (event) {
        console.log(event.keyCode);
        if (event.keyCode == 38 || event.keyCode == 40) {
            for (var i = 0; i < $scope.files.length; i++) {
                if ($scope.files[i]['id'] == $scope.selectedfileid) {
                    var j = event.keyCode == 38 ? i - 1 : i + 1;
                    if (j >= 0 && j < $scope.files.length)
                        $scope.selectedfileid = $scope.files[j].id;
                    break;
                }
            }
        }
        else if (event.keyCode == 8 || event.keyCode == 46) {
            editor.DocEditor.docInfo['isDeleted'] = true;
            editor.DocEditor.infoChanged = true;
            console.log('deleted', editor.DocEditor.docInfo);
            editor.DocEditor.saveEditorContent($scope);
        }
        else if (event.keyCode == 45) {
            $scope.newdoc();
        }
    };
});
