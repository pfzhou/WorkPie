workpieApp.controller('docController',function($scope, $sce) {
  'use strick';
  $scope.docEditor = {};
  $scope.docEditor.title = '';
  $scope.docEditor.content = '';//$sce.trustAsHtml('');

  $scope.changeTitle = function(){
    if(!WorkPie.Editor.DocEditor.docInfo)
    {
      if(WorkPie.Editor.DocEditor.docInfo == null)
      {
        WorkPie.Editor.DocEditor.docInfo = new WorkPie.Editor.DocInfo();
      }
    }
    WorkPie.Editor.DocEditor.docInfo.title = $scope.docEditor.title;
    WorkPie.Editor.DocEditor.docInfo.modifyTime = new Date();
    //$scope.docEditor.content = $sce.trustAsHtml($scope.docEditor.title);
  };
});
