workpieApp.controller('listController',function($scope) {
  'use strick';
  var editor = WorkPie.Editor;
  $scope.docs = {};

  loadList();

  function loadList(){
    wdDb.db.find({}).sort({ 'modifyTime': -1 }).exec(function(err, docs) {
      if(!err)
      {
        $scope.docs = docs;
        $scope.$apply();
        console.log('找到文档列表，一共有：' + docs.length, docs[0]);
      }
      else
        console.log('加载文档列表出错：' + err);
    });
  }

  $scope.loaddoc = function(elm, docid){
    console.log('加载文档，id = ' + docid, elm);
    editor.DocEditor.loadEditorContent(docid);
    //elm.class = 'list-group-item active';
  }

  $scope.getTime = function(time){
    return getDateDiff(time);
  }

  function getDateDiff(dateTime){

    var minute = 1000 * 60;
    var hour = minute * 60;
    var now = new Date();

    if(now.toDateString() == dateTime.toDateString())
    {
      var nowtime = now.getTime();
      var diffValue = now.getTime() - dateTime.getTime();

      var hourC =diffValue/hour;
      var minC =diffValue/minute;

      var result;
      if(hourC >= 1)
      {
        result = editor.formatDate(dateTime, 'hh:mm:ss');
      }
      else if(minC>=1){
        result=parseInt(minC) +"分钟前";// + WorkPie.Editor.formatDate(dateTime, 'hh:mm:ss');
      }else
      {
        result="1分钟以内";
      }
      return result;
    }
    else if(editor.formatDate(now, 'yyyy') == editor.formatDate(dateTime, 'yyyy'))
    {
      return editor.formatDate(dateTime, 'MM-dd hh:mm');
    }
    else
    {
      return editor.formatDate(dateTime, 'yyyy-MM-dd hh:mm');
    }
  }
});
