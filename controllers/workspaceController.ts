workpieApp.controller('workspaceController',function($scope) {
  'use strick';
  $scope.$on('docSaved', function(event,doc) {
    $scope.$broadcast("refreshList", doc);
  });
  $scope.$on('docDeleted', function(event,doc) {
    $scope.$broadcast("refreshList", doc);
  });
  $scope.$on('loadAttachments', function(event,message) {
    $scope.$broadcast("refreshAttachments", message);
  });
  $scope.$on('updateAttachments', function(event,message) {
    $scope.$broadcast("refreshAttachments", message);
  });
});
