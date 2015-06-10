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
        scope: true,
        link: function (scope, element, attrs) {
            var oldContentHtml = '';
        }
    };
});
