workpieApp.controller('listController', function ($scope) {
    'use strick';
    $scope.docs = [
        { "id": "b9714d7e-d8f6-4092-befe-5f4a2ce72d17", "title": "testabc234234", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150610/b9714d7e-d8f6-4092-befe-5f4a2ce72d17/", "contentFilename": ".content.txt", "infoFilename": ".info.txt", "attachments": [], "tags": [], "contentSize": 195, "createTime": { "$$date": 1433912815102 }, "modifyTime": { "$$date": 1433913307466 }, "_id": "0cX24aojz88zBKsM" },
        { "id": "1c423fb3-4d30-4953-a044-ae271f5bd1b7", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150610/1c423fb3-4d30-4953-a044-ae271f5bd1b7/", "contentFilename": ".content.txt", "infoFilename": ".info.txt", "attachments": [], "tags": [], "contentSize": 31, "createTime": { "$$date": 1433912261789 }, "modifyTime": { "$$date": 1433912261791 }, "_id": "3t4QFWOp9yegfvSB" },
        { "id": "91f6b82c-dfe4-42b9-8dda-e91bf07430e7", "title": "abcd", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150610/91f6b82c-dfe4-42b9-8dda-e91bf07430e7/", "contentFilename": ".content.txt", "infoFilename": ".info.txt", "attachments": [], "tags": [], "contentSize": 31, "createTime": { "$$date": 1433912463326 }, "modifyTime": { "$$date": 1433912501143 }, "_id": "C7VPl3pzLRT7l7Mz" },
        { "id": "82716fe8-95d6-4955-a413-900dd0924e4b", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150610/82716fe8-95d6-4955-a413-900dd0924e4b/", "contentFilename": ".content.txt", "infoFilename": ".info.txt", "attachments": [], "tags": [], "contentSize": 26, "createTime": { "$$date": 1433912198034 }, "modifyTime": { "$$date": 1433912198035 }, "_id": "FXsVLDu9ED1u41Yl" },
        { "id": "3ae6eac4-1333-41ba-aa24-7a068ac6c057", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150609/", "contentFilename": "3ae6eac4-1333-41ba-aa24-7a068ac6c057.json", "attachments": [], "tags": [], "contentSize": 39, "createTime": { "$$date": 1433832770334 }, "modifyTime": { "$$date": 1433832847011 }, "_id": "1lENqp6c72jApmtm" },
        { "id": "48234836-8768-441b-86e3-8729acd275c9", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150609/", "contentFilename": "48234836-8768-441b-86e3-8729acd275c9.json", "attachments": [], "tags": [], "contentSize": 31, "createTime": { "$$date": 1433832871954 }, "modifyTime": { "$$date": 1433832908754 }, "_id": "5hksqmjkCayLQGX9" },
        { "id": "e342a804-e2a1-4ef4-adab-8b1c06fbf988", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150609/", "contentFilename": "e342a804-e2a1-4ef4-adab-8b1c06fbf988.json", "attachments": [], "tags": [], "contentSize": 39, "createTime": { "$$date": 1433820787350 }, "modifyTime": { "$$date": 1433820801324 }, "_id": "MpilI74P3ifR6ZKn" },
        { "id": "c0a8b299-97ad-48ed-a082-f8d30cc10326", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150609/", "contentFilename": "c0a8b299-97ad-48ed-a082-f8d30cc10326.json", "attachments": [], "tags": [], "contentSize": 15, "createTime": { "$$date": 1433833097459 }, "modifyTime": { "$$date": 1433833131235 }, "_id": "OVe4G09NxrnotJXJ" },
        { "id": "d3c667b8-d893-4672-8093-ef4026ed4160", "title": "abddcd", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150609/", "contentFilename": "d3c667b8-d893-4672-8093-ef4026ed4160.json", "attachments": [], "tags": [], "contentSize": 59, "createTime": { "$$date": 1433820354925 }, "modifyTime": { "$$date": 1433854162429 }, "_id": "VWPPkeIAJ1apRFCU" },
        { "id": "e5c510f7-7b01-4bc0-953b-d29a730c3027", "title": "无标题", "project": "未分类", "path": "/未分类/", "folderid": "", "diskpath": "20150609/", "contentFilename": "e5c510f7-7b01-4bc0-953b-d29a730c3027.json", "attachments": [], "tags": [], "contentSize": 24, "createTime": { "$$date": 1433821251769 }, "modifyTime": { "$$date": 1323821251771 }, "_id": "l6BGRqN5XsTMcZxK" }
    ];
    var editor = WorkPie.Editor;
    $scope.loaddoc = function (elm, docid) {
        console.log('加载文档，id = ' + docid, elm);
        editor.DocEditor.loadEditorContent(docid);
    };
    $scope.getTime = function (time) {
        var date = new Date(time['$$date']);
        return getDateDiff(date);
    };
    function getDateDiff(dateTime) {
        var minute = 1000 * 60;
        var hour = minute * 60;
        var now = new Date();
        if (now.toDateString() == dateTime.toDateString()) {
            var nowtime = now.getTime();
            var diffValue = now.getTime() - dateTime.getTime();
            var hourC = diffValue / hour;
            var minC = diffValue / minute;
            var result;
            if (hourC > 0) {
                result = editor.formatDate(dateTime, 'hh:mm:ss');
            }
            else if (minC >= 1) {
                result = parseInt(minC) + "分钟前";
            }
            else {
                result = "1分钟以内";
            }
            return result;
        }
        else if (editor.formatDate(now, 'yyyy') == editor.formatDate(dateTime, 'yyyy')) {
            return editor.formatDate(dateTime, 'MM-dd hh:mm');
        }
        else {
            return editor.formatDate(dateTime, 'yyyy-MM-dd hh:mm');
        }
    }
});
