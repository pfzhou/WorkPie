/// <reference path="../../typings/angular.d.ts"/>
//定义工作桌面的指令
var workspaceDirective = angular.module('workspaceDirective', []);
//主工作桌面
workspaceDirective.directive('workspace', function () {
    return {
        restrict: 'E',
        //template: '<div ng-transclude>main</div>',
        templateUrl: 'workspace/workspace.html',
        //replace: true,
        transclude: true
    };
});
//左侧工具条
workspaceDirective.directive('workspaceleft', function () {
    return {
        restrict: 'E',
        //replace: true,
        //template: '<div>Hi there <span ng-transclude></span></div>',
        templateUrl: 'workspace/workspaceleft.html',
        transclude: true
    };
});
//主导航列表
workspaceDirective.directive('workspacelist', function () {
    return {
        restrict: 'E',
        //replace: true,
        //template: '<div>Hi there <span ng-transclude></span></div>',
        templateUrl: 'workspace/workspacelist.html',
        transclude: true
    };
});
//文档窗口
workspaceDirective.directive('workspacedoc', function () {
    return {
        restrict: 'E',
        //replace: true,
        //template: '<div>Hi there <span ng-transclude></span></div>',
        templateUrl: 'workspace/workspacedoc.html',
        transclude: true
    };
});
