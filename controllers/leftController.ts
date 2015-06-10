workpieApp.controller('leftController',function($scope) {
  'use strick';
  $scope.savedoc = function(){
    WorkPie.Editor.DocEditor.saveEditorContent();
  };
  $scope.loaddoc = function(){
    //WorkPie.Editor.DocEditor.loadEditorContent('b9714d7e-d8f6-4092-befe-5f4a2ce72d17');
  }
});
