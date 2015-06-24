workpieApp.controller('listController', function ($scope) {
    'use strick';
    var editor = WorkPie.Editor;
    $scope.docs = {};
    $scope.query = { title: '' };
    $scope.selecteddocid = '';
    loadList();
    function loadList() {
        wdDb.db.find({ isDeleted: { $ne: [true] } }).sort({ 'modifyTime': -1 }).toArray(function (err, docs) {
            if (!err) {
                $scope.docs = docs;
                $scope.$apply();
                console.log('找到文档列表，一共有：' + docs.length, _.pluck($scope.docs, 'title'));
            }
            else
                console.log('加载文档列表出错：' + err);
        });
    }
    ;
    $scope.updatedocs = function (doc) {
        var temp = true;
        for (var i = 0; i < $scope.docs.length; i++) {
            if ($scope.docs[i].id == doc.id) {
                if (doc.isDeleted) {
                    var j = i == 0 ? 1 : i - 1;
                    if ($scope.docs.length > 1 && j <= $scope.docs.length) {
                        $scope.loaddoc(null, $scope.docs[j].id);
                    }
                    $scope.docs.splice(i, 1);
                }
                else {
                    $scope.docs[i] = _.clone(doc);
                    $scope.selecteddocid = doc.id;
                }
                $scope.docs = _.sortBy($scope.docs, function (doc) {
                    return -doc['modifyTime'];
                });
                temp = false;
                break;
            }
        }
        if (temp) {
            $scope.docs.unshift(_.clone(doc));
            $scope.selecteddocid = doc.id;
        }
        $scope.$apply();
    };
    $scope.loaddoc = function (event, docid) {
        console.log('加载文档，id = ' + docid);
        editor.DocEditor.loadEditorContent(docid);
        $scope.selecteddocid = docid;
    };
    $scope.newdoc = function () {
        editor.DocEditor.clearEditor();
        $scope.selecteddocid = '';
    };
    $scope.cancelsearch = function (event) {
        if (event.keyCode == 27) {
            $scope.query.title = '';
        }
    };
    $scope.listkeyup = function (event) {
        console.log(event.keyCode);
        if (event.keyCode == 38 || event.keyCode == 40) {
            for (var i = 0; i < $scope.docs.length; i++) {
                if ($scope.docs[i]['id'] == $scope.selecteddocid) {
                    var j = event.keyCode == 38 ? i - 1 : i + 1;
                    if (j >= 0 && j < $scope.docs.length)
                        $scope.loaddoc(null, $scope.docs[j].id);
                    break;
                }
            }
        }
        else if (event.keyCode == 8 || event.keyCode == 46) {
            editor.DocEditor.docInfo['isDeleted'] = true;
            editor.DocEditor.infoChanged = true;
            console.log('deleted', editor.DocEditor.docInfo);
            editor.DocEditor.saveEditorContent($scope);
        }
        else if (event.keyCode == 45) {
            $scope.newdoc();
        }
    };
    $scope.$on('refreshList', function (event, doc) {
        $scope.updatedocs(doc);
    });
    $scope.getTime = function (time) {
        return getDateDiff(time);
    };
});
