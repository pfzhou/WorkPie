//通用的指令定义
var commonDirective = angular.module('commonDirective', []);

commonDirective.directive('script', function() {
    return {
      restrict: 'E',
      scope: false,
      link: function(scope, elem, attr)
      {
        if (attr.type==='text/javascript-lazy')
        {
          var s = document.createElement("script");
          s.type = "text/javascript";
          var src = elem.attr('src');
          if(src!==undefined)
          {
              s.src = src;
              document.head.appendChild(s);
          }
          else
          {
              var code = elem.text();
              s.text = code;
              document.body.appendChild(s);
          }

          elem.remove();
        }
      }
    };
  });
