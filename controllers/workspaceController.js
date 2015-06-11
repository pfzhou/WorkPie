workpieApp.controller('workspaceController', function ($scope) {
    'use strick';
    $scope.$on('docSaved', function (event, msg) {
        console.log('收到并转发docSaved消息。');
        $scope.$broadcast("refreshList", msg);
    });
});
