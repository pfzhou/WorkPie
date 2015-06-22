workpieApp.controller('docController',function($scope, $sce) {
  'use strick';
  $scope.docEditor = {};
  $scope.docEditor.title = '';
  $scope.docEditor.content = '';//$sce.trustAsHtml('');


  var editor = WorkPie.Editor;

  $scope.changeTitle = function(){
    if(editor.DocEditor.docInfo == null)
    {
      editor.DocEditor.docInfo = new editor.DocInfo();
      editor.DocEditor.infoChanged = true;
    }
    editor.DocEditor.docInfo.title = $scope.docEditor.title;
    editor.DocEditor.docInfo.modifyTime = new Date();
  };
  $scope.getAttachments = function(){

    var result: editor.AttachmentInfo[] = [];
    if(editor.DocEditor.docInfo)
    {
      result = _.clone(editor.DocEditor.docInfo.attachments);
    }
    console.log('!!!!!!!!!!附件个数='+result.length);
    return result;
  }
  $scope.files = [];//= $scope.getAttachments();

  $scope.$on('refreshAttachments', function(event,message) {
    $scope.files = $scope.getAttachments();
    //$scope.$apply();
  });

});
