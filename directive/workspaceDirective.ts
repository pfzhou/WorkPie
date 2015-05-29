/// <reference path="../typings/angular.d.ts"/>

//定义工作桌面的指令
var workspaceDirective = angular.module('workspaceDirective', []);
//主工作桌面
workspaceDirective.directive('workspace', function() {
  return {
      restrict: 'E',
      templateUrl: './directive/workspace.html',
      transclude: true
  };
});
//左侧工具条
workspaceDirective.directive('workspaceleft', function() {
  return {
      restrict: 'E',
      templateUrl: './directive/workspaceleft.html'
  };
});
//主导航列表
workspaceDirective.directive('workspacelist', function() {
  return {
      restrict: 'E',
      templateUrl: './directive/workspacelist.html'
  };
});
//文档窗口
workspaceDirective.directive('workspacedoc', function() {
  return {
      restrict: 'E',
      templateUrl: './directive/workspacedoc.html'
  };
});
