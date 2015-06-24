var workspaceDirective = angular.module('workspaceDirective', []);
workspaceDirective.directive('workspace', function () {
    return {
        restrict: 'E',
        templateUrl: './views/workspace.html',
        transclude: true
    };
});
workspaceDirective.directive('workspaceleft', function () {
    return {
        restrict: 'E',
        templateUrl: './views/workspaceleft.html'
    };
});
workspaceDirective.directive('workspacelist', function () {
    return {
        restrict: 'E',
        templateUrl: './views/workspacelist.html'
    };
});
workspaceDirective.directive('workspacedoc', function () {
    return {
        restrict: 'E',
        templateUrl: './views/workspacedoc.html'
    };
});
workspaceDirective.directive('doceditor', function () {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs) {
            var oldContentHtml = '';
            setInterval(function () {
                scope.$apply(function () {
                    var editor = WorkPie.Editor;
                    editor.DocEditor.saveEditorContent(scope);
                });
            }, 2000);
        }
    };
});
workspaceDirective.directive('doclistitem', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            var editor = WorkPie.Editor;
            scope.$evalAsync(function () {
            });
            $timeout(function () {
            });
        }
    };
});
