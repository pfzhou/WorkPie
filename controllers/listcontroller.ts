workpieApp.controller('listController',function($scope) {
  'use strick';
  var editor = WorkPie.Editor;
  $scope.docs = {};
  $scope.query = {title: ''};
  $scope.selecteddocid = '';

  loadList();

  function loadList(){
    wdDb.db.find({isDeleted: {$ne: [true]}}).sort({ 'modifyTime': -1 }).toArray(function(err, docs) {
      if(!err)
      {
        $scope.docs = docs;
        $scope.$apply();
        console.log('找到文档列表，一共有：' + docs.length, _.pluck($scope.docs, 'title'));
      }
      else
        console.log('加载文档列表出错：' + err);
    });
  };

  $scope.updatedocs = function(doc){
    //loadList();
    var temp = true;
    for(var i = 0; i < $scope.docs.length; i++)
    {
      if($scope.docs[i].id == doc.id)
      {

        if(doc.isDeleted){
          var j = i == 0 ? 1 : i - 1;
          if($scope.docs.length > 1 && j <= $scope.docs.length){
            $scope.loaddoc(null, $scope.docs[j].id);
          }
          $scope.docs.splice(i, 1);
        }
        else{
          $scope.docs[i] = _.clone(doc);
          $scope.selecteddocid = doc.id;
        }

        $scope.docs = _.sortBy($scope.docs, function(doc){
          return -doc['modifyTime'];
        });
        temp = false;
        break;
      }
    }
    if(temp){
      $scope.docs.unshift(_.clone(doc));
      $scope.selecteddocid = doc.id;
    }
    $scope.$apply();
  }

  $scope.loaddoc = function(event, docid){
    console.log('加载文档，id = ' + docid);
    editor.DocEditor.loadEditorContent(docid);
    $scope.selecteddocid = docid;
    $scope.$emit('loadAttachments', "");
  };

  $scope.newdoc = function(){
    editor.DocEditor.clearEditor();
    $scope.selecteddocid = '';
    $scope.$emit('loadAttachments', "");
  };

  $scope.cancelsearch = function(event){
    if (event.keyCode == 27) {
      $scope.query.title = '';
    }
  };

  $scope.listkeyup = function(event){
    //38 ↑，40 ↓，8 ←，46 del，45 insert
    console.log(event.keyCode);
    if (event.keyCode == 38 || event.keyCode == 40) {
      //上下键选定文档
      for(var i = 0; i < $scope.docs.length; i++){
        if($scope.docs[i]['id'] == $scope.selecteddocid)
        {
          var j = event.keyCode == 38 ? i - 1 : i + 1;
          if(j >= 0 && j < $scope.docs.length) $scope.loaddoc(null, $scope.docs[j].id);
          break;
        }
      }
    }else if(event.keyCode == 8 || event.keyCode == 46){
      //删除选中的文档
      editor.DocEditor.docInfo['isDeleted'] = true;
      editor.DocEditor.infoChanged = true;
      console.log('deleted', editor.DocEditor.docInfo);
      editor.DocEditor.saveEditorContent($scope);
    }else if(event.keyCode == 45){
      //新建文档
      $scope.newdoc();
    }
  };

  $scope.$on('refreshList', function(event,doc) {
    $scope.updatedocs(doc);
  });

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

workpieApp.filter('listFilter', function() {
  // | listFilter:query:
    return function(docs, searchText) {
        //console.log('content: ' + content);
        var searchRegx = new RegExp(searchText, "i");
        if((searchText == undefined) || (content.search(searchRegx) != -1))
        {
            return docs;
        }
        var result = [];
        for (var i = 0; i < docs.length; i++) {
            if (docs[i].title.search(searchRegx) != -1 ||
                docs[i].project.search(searchText) != -1) {
                result.push(docs[i]);
            }
        }
        return result;
    }
});
