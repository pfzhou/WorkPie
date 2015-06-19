workpieApp.controller('workspaceController',function($scope) {
  'use strick';
  $scope.$on('docSaved', function(event,doc) {
    $scope.$broadcast("refreshList", doc);
  });
  $scope.$on('docDeleted', function(event,doc) {
    $scope.$broadcast("refreshList", doc);
  });
});
