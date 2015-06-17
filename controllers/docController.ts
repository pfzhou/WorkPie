workpieApp.controller('docController',function($scope, $sce) {
  'use strick';
  $scope.docEditor = {};
  $scope.docEditor.title = '';
  $scope.docEditor.content = '';//$sce.trustAsHtml('');
  var editor = WorkPie.Editor;

  $scope.changeTitle = function(){
    if(!editor.DocEditor.docInfo)
    {
      if(editor.DocEditor.docInfo == null)
      {
        editor.DocEditor.docInfo = new editor.DocInfo();
      }
    }
    editor.DocEditor.docInfo.title = $scope.docEditor.title;
    editor.DocEditor.docInfo.modifyTime = new Date();
    editor.DocEditor.infoChanged = true;
  };
});
