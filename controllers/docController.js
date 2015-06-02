workpieApp.controller('docController', function ($scope) {
    $scope.docEditor = {};
    $scope.docEditor.title = '';
    $scope.docEditor.content = '';
    //console.log($scope.docEditor.title);
    //console.log($scope.docEditor.content);
    // var watch = $scope.$watch($scope.docEditor.content, function(newValue,oldValue, scope){
    //         console.log(newValue);
    //         console.log(oldValue);
    // });
    // $scope.savedoc = function(){
    //   console.log(editor.serialize());
    // };
});
