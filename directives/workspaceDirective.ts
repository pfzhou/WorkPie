//定义工作桌面的指令
var workspaceDirective = angular.module('workspaceDirective', []);
//主工作桌面
workspaceDirective.directive('workspace', function() {
  return {
      restrict: 'E',
      templateUrl: './views/workspace.html',
      transclude: true
  };
});
//左侧工具条
workspaceDirective.directive('workspaceleft', function() {
  return {
      restrict: 'E',
      templateUrl: './views/workspaceleft.html'
  };
});
//主导航列表
workspaceDirective.directive('workspacelist', function() {
  return {
      restrict: 'E',
      templateUrl: './views/workspacelist.html'
  };
});
//文档窗口
workspaceDirective.directive('workspacedoc', function() {
  return {
      restrict: 'E',
      templateUrl: './views/workspacedoc.html'
  };
});
//文档编辑器
workspaceDirective.directive('doceditor', function () {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
          var oldContentHtml = '';
          setInterval(function(){
            scope.$apply(function(){
              // Show message
              //scope.saving = true;
              //console.log(element);
              //console.log(attrs);
              var editor = WorkPie.Editor;
              console.log('saving.....');
              editor.DocEditor.saveEditorContent(scope);
              // if(oldContentHtml !== element.html())
              // {
              //   console.log('doceditor contentHtml: ',element.html());
              //   oldContentHtml = element.html();
              //   //todo: 调用保存的接口
              // }
              // else{
              //   console.log('nothing change.');
              // }
              // Hide saving message
              //scope.saving = false;
              console.log('saved.');
            });
          }, 5000);
        }
    };
});

workspaceDirective.directive('doclistitem', function($timeout){
  return {
      restrict: 'A',
      link: function(scope, element,attr){
        var editor = WorkPie.Editor;
        scope.$evalAsync(function(){
          // executes after compile/link
          // and before render
        });
        $timeout(function(){
          // executes after render
          if(editor.DocEditor.docInfo && (editor.DocEditor.docInfo.id == attr['doclistitem']))
          {
            attr.$updateClass('list-group-item active', 'list-group-item');
          }

        });
      }
    }
});
