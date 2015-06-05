workpieApp.controller('leftController',function($scope) {
  $scope.savedoc = function(){
    saveEditorContent(editor.serialize());
  };
});
