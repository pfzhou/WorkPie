var fs = require('fs-extra');
var uuid = require('node-uuid');
var WorkPie;
(function (WorkPie) {
    var Editor;
    (function (Editor) {
        'use strick';
        var DocEditor = (function () {
            function DocEditor() {
            }
            DocEditor.initEditor = function () {
                var elements = document.querySelectorAll('.editable');
                this.editor = new MediumEditor(elements, {
                    buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'header1', 'header2'],
                    buttonLabels: 'fontawesome',
                    placeholder: '请输入内容',
                    firstHeader: 'h1',
                    secondHeader: 'h2',
                    anchorInputPlaceholder: '输入链接地址',
                    anchorInputCheckboxLabel: '在新窗口中打开',
                });
            };
            DocEditor.loadEditorContent = function (docid) {
                DocEditor.getDocInfo(docid, function (doc) {
                    DocEditor.docInfo = doc;
                    if (DocEditor.docInfo) {
                        angular.element('.titleinput').scope()['docEditor']['title'] = DocEditor.docInfo.title;
                        angular.element('.titleinput').scope().$apply();
                        var docPath = workpieConfig.dataPath + workpieConfig.docFolder + DocEditor.docInfo.diskpath + DocEditor.docInfo.contentFilename;
                        if (fs.existsSync(docPath)) {
                            console.log('读取文档内容文件： ' + docPath);
                            var contentJson = fs.readJSONSync(docPath);
                            var docContent = contentJson['content'];
                            console.log('文档内容： ', docContent);
                            angular.element('.editable').scope()['docEditor']['content'] = docContent;
                            angular.element('.editable').scope().$apply();
                            console.log('文档内容加载成功。');
                        }
                        else {
                            angular.element('.editable').scope()['docEditor']['content'] = '';
                            angular.element('.editable').scope().$apply();
                            console.log('文件不存在： ' + docPath);
                        }
                    }
                });
            };
            DocEditor.saveEditorContent = function (scope) {
                var docContent = this.editor.elements[0].innerHTML;
                if (DocEditor.docInfo == null) {
                    DocEditor.docInfo = new DocInfo();
                }
                DocEditor.docInfo.contentSize = docContent.length;
                DocEditor.docInfo.modifyTime = new Date();
                wdDb.db.update({ id: DocEditor.docInfo.id }, DocEditor.docInfo, { upsert: true }, function (err, numReplaced, upsert) {
                    if (err)
                        console.log('保存文档信息到数据库出错', err);
                    console.log(numReplaced, upsert);
                });
                var docPath = workpieConfig.dataPath + workpieConfig.docFolder + DocEditor.docInfo.diskpath;
                console.log('准备保存文档内容到：' + docPath);
                if (!fs.existsSync(docPath)) {
                    fs.mkdirsSync(docPath);
                }
                ;
                var contentJson = JSON.parse('{}');
                contentJson['content'] = this.editor.elements[0].innerHTML;
                fs.writeFileSync(docPath + DocEditor.docInfo.contentFilename, angular.toJson(contentJson));
                console.log('文档保存成功，id = ' + DocEditor.docInfo.id);
                fs.writeFileSync(docPath + DocEditor.docInfo.infoFilename, angular.toJson(DocEditor.docInfo));
                console.log('文档信息保存成功，id = ' + DocEditor.docInfo.id);
                console.log('发送docSaved消息。');
                scope.$emit('docSaved', 'SaveButton');
            };
            DocEditor.getDocInfo = function (docid, callback) {
                var result = null;
                wdDb.db.find({ id: docid }).toArray(function (error, docs) {
                    if (error) {
                        console.log('加载文档出错，docid = ' + docid, error);
                        alert('加载文档出错，docid = ' + docid);
                    }
                    else {
                        if (docs.length > 1) {
                            alert('加载文档出错，找到都条id重复的文档，docid = ' + docid);
                        }
                        if (docs.length == 1) {
                            console.log('找到文档，docid = ' + docid, docs[0]);
                            result = docs[0];
                            console.log('文档信息加载成功。');
                        }
                        else {
                            console.log('没有找到文档，docid = ' + docid);
                        }
                    }
                    callback(result);
                });
            };
            DocEditor.editor = null;
            DocEditor.docInfo = null;
            return DocEditor;
        })();
        Editor.DocEditor = DocEditor;
        var DocInfo = (function () {
            function DocInfo() {
                this.id = '';
                this.title = '无标题';
                this.project = '未分类';
                this.path = '/未分类/';
                this.folderid = '';
                this.diskpath = '';
                this.contentFilename = '.content.txt';
                this.infoFilename = '.info.txt';
                this.attachments = [];
                this.tags = [];
                this.contentSize = 0;
                this.createTime = null;
                this.modifyTime = null;
                this.id = uuid.v4();
                this.createTime = new Date();
                this.modifyTime = new Date();
                var path = formatDate(this.createTime, 'yyyyMMdd') + '/' + this.id + '/';
                console.log('新建文档路径：' + path);
                this.diskpath = path;
            }
            return DocInfo;
        })();
        Editor.DocInfo = DocInfo;
        var AttachmentInfo = (function () {
            function AttachmentInfo() {
                this.id = '';
                this.fileName = '';
                this.extension = '';
                this.fileType = '';
                this.fileSize = 0;
                this.fileSizeDisplay = '0K';
                this.fileAddTime = null;
                this.fileCreateTime = null;
                this.fileModifyTime = null;
            }
            return AttachmentInfo;
        })();
        Editor.AttachmentInfo = AttachmentInfo;
        function formatDate(date, style) {
            var y = date.getFullYear();
            var M = "0" + (date.getMonth() + 1);
            M = M.substring(M.length - 2);
            var d = "0" + date.getDate();
            d = d.substring(d.length - 2);
            var h = "0" + date.getHours();
            h = h.substring(h.length - 2);
            var m = "0" + date.getMinutes();
            m = m.substring(m.length - 2);
            var s = "0" + date.getSeconds();
            s = s.substring(s.length - 2);
            return style.replace('yyyy', y).replace('MM', M).replace('dd', d).replace('hh', h).replace('mm', m).replace('ss', s);
        }
        Editor.formatDate = formatDate;
        ;
        DocEditor.initEditor();
        DocEditor.editor.subscribe('editableInput', function (event, editable) {
        });
        DocEditor.editor.subscribe('editableClick', function (event, editable) {
        });
        DocEditor.editor.subscribe('editableBlur', function (event, editable) {
        });
    })(Editor = WorkPie.Editor || (WorkPie.Editor = {}));
})(WorkPie || (WorkPie = {}));
module.exports = WorkPie.Editor;
