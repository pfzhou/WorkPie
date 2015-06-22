var fs = require('fs-extra');
var uuid = require('node-uuid');
var path = require('path');
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
                    if (doc) {
                        DocEditor.infoChanged = false;
                        DocEditor.contentChanged = false;
                        DocEditor.docInfo = doc;
                        angular.element('.titleinput').scope()['docEditor']['title'] = DocEditor.docInfo.title;
                        angular.element('.titleinput').scope().$apply();
                        var docPath = workpieConfig.dataPath + workpieConfig.docFolder + DocEditor.docInfo.diskpath + DocEditor.docInfo.contentFilename;
                        if (fs.existsSync(docPath)) {
                            console.log('读取文档内容文件： ' + docPath);
                            var contentJson = fs.readJSONSync(docPath);
                            DocEditor.docContent = contentJson['content'];
                            console.log('文档内容： ', DocEditor.docContent);
                            console.log('文档内容加载成功。');
                        }
                        else {
                            DocEditor.docContent = '';
                            console.log('文件不存在： ' + docPath);
                        }
                        angular.element('.editable').scope()['docEditor']['content'] = DocEditor.docContent;
                        angular.element('.editable').scope().$apply();
                    }
                });
            };
            DocEditor.clearEditor = function () {
                DocEditor.docInfo = null;
                angular.element('.titleinput').scope()['docEditor']['title'] = '';
                angular.element('.titleinput').focus();
                angular.element('.editable').scope()['docEditor']['content'] = '';
            };
            DocEditor.saveEditorContent = function (scope) {
                if (this.docInfo == null && (this.infoChanged || this.contentChanged)) {
                    this.docInfo = new DocInfo();
                    this.infoChanged = true;
                }
                if (this.infoChanged || this.contentChanged) {
                    var newContent = this.editor.elements[0].innerHTML;
                    this.docInfo.contentSize = newContent.length;
                    this.docContent = newContent;
                    this.docInfo.modifyTime = new Date();
                    wdDb.db.update({ id: this.docInfo.id }, this.docInfo, { upsert: true }, function (err, numReplaced, upsert) {
                        if (err) {
                            console.log('保存文档信息到数据库出错', err);
                            return;
                        }
                        console.log('文档信息保存成功，id = ' + DocEditor.docInfo.id);
                        var docPath = workpieConfig.dataPath + workpieConfig.docFolder + DocEditor.docInfo.diskpath;
                        if (!fs.existsSync(docPath)) {
                            fs.mkdirsSync(docPath);
                        }
                        ;
                        var docInfoClone = _.clone(DocEditor.docInfo);
                        docInfoClone['content'] = DocEditor.docContent;
                        docInfoClone['text'] = DocEditor.editor.elements[0].innerText;
                        fs.writeFileSync(docPath + DocEditor.docInfo.contentFilename, angular.toJson(docInfoClone));
                        console.log('文档文件保存成功，id = ' + DocEditor.docInfo.id);
                        DocEditor.infoChanged = false;
                        DocEditor.contentChanged = false;
                        if (!scope)
                            scope = angular.element('.editable').scope();
                        if (DocEditor.docInfo.isDeleted) {
                            var info = DocEditor.docInfo;
                            DocEditor.docInfo = null;
                            angular.element('.titleinput').scope()['docEditor']['title'] = '';
                            angular.element('.titleinput').scope().$apply();
                            angular.element('.editable').scope()['docEditor']['content'] = '';
                            angular.element('.editable').scope().$apply();
                            scope.$emit('docDeleted', info);
                        }
                        else {
                            scope.$emit('docSaved', DocEditor.docInfo);
                        }
                    });
                }
                else
                    console.log('文档没有修改，无需保存');
            };
            DocEditor.getDocInfo = function (docid, callback) {
                var result = null;
                wdDb.db.find({ id: docid, isDeleted: { $ne: [true] } }).toArray(function (error, docs) {
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
            DocEditor.addAttachment = function (filePath) {
                var docinfo = this.docInfo;
                var atta = new AttachmentInfo();
                atta.filePath = filePath;
                atta.fileName = path.basename(filePath);
                atta.extension = path.extname(filePath);
                var fileFullPath = workpieConfig.dataPath + workpieConfig.docFolder + filePath;
                var filestat = fs.statSync(fileFullPath);
                atta.fileSize = filestat.size;
                console.log(filestat);
                atta.fileCreateTime = filestat.birthtime;
                atta.fileModifyTime = filestat.ctime;
                docinfo.attachments.push(atta);
                console.log('添加文件成功！！！');
                this.infoChanged = true;
                this.refreshAttatchmentList();
            };
            ;
            DocEditor.refreshAttatchmentList = function () {
                var scope = angular.element('.editable').scope();
                scope.$emit('loadAttachments', "");
            };
            DocEditor.editor = null;
            DocEditor.docInfo = null;
            DocEditor.docContent = '';
            DocEditor.infoChanged = false;
            DocEditor.contentChanged = false;
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
                this.attachments = [];
                this.tags = [];
                this.contentSize = 0;
                this.createTime = null;
                this.modifyTime = null;
                this.isDeleted = false;
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
                this.filePath = '';
                this.fileSize = 0;
                this.fileAddTime = null;
                this.fileCreateTime = null;
                this.fileModifyTime = null;
                this.id = uuid.v4();
                this.fileAddTime = new Date();
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
            DocEditor.contentChanged = true;
        });
        DocEditor.editor.subscribe('editableClick', function (event, editable) {
        });
        DocEditor.editor.subscribe('editableBlur', function (event, editable) {
        });
        var holder = document.getElementById('container');
        holder.ondragover = function () {
            return false;
        };
        holder.ondragleave = holder.ondragend = function () {
            return false;
        };
        holder.ondrop = function (e) {
            e.preventDefault();
            var message = '';
            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                if (DocEditor.docInfo == null) {
                    DocEditor.docInfo = new DocInfo();
                    DocEditor.infoChanged = true;
                }
                var file = e.dataTransfer.files[i];
                var filename = path.basename(file.path);
                var filePath = DocEditor.docInfo.diskpath + filename;
                var desc = workpieConfig.dataPath + workpieConfig.docFolder + filePath;
                if (!fs.existsSync(desc)) {
                    console.log('文件复制中...\n' + file + ' -> ' + desc);
                    fs.copySync(file.path, desc);
                    DocEditor.addAttachment(filePath);
                }
            }
            return false;
        };
    })(Editor = WorkPie.Editor || (WorkPie.Editor = {}));
})(WorkPie || (WorkPie = {}));
module.exports = WorkPie.Editor;
