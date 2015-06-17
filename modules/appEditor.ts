import fs = require('fs-extra');
import uuid = require('node-uuid');
//编辑器js类
declare var MediumEditor: any;

module WorkPie.Editor{
  'use strick';
  //文档编辑器操作类
  export class DocEditor{
    //编辑器对象实例
    static editor: any = null;
    private static docInfo: DocInfo = null;
    private static docContent: string = '';
    static infoChanged: boolean = false;
    static contentChanged: boolean = false;
    //初始化编辑器
    static initEditor(){
      var elements = document.querySelectorAll('.editable');
      this.editor = new MediumEditor(elements, {
            buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull','orderedlist', 'unorderedlist', 'pre', 'outdent', 'indent', 'header1', 'header2'],
            buttonLabels: 'fontawesome',
            placeholder: '请输入内容',
            firstHeader: 'h1',
            secondHeader: 'h2',
            anchorInputPlaceholder: '输入链接地址',
            anchorInputCheckboxLabel: '在新窗口中打开',
      });
    }

    //根据docid加载文档数据
    static loadEditorContent(docid: string){
      DocEditor.getDocInfo(docid, function(doc){
        if(doc)
        {
          DocEditor.infoChanged = false;
          DocEditor.contentChanged = false;

          DocEditor.docInfo = doc;
          angular.element('.titleinput').scope()['docEditor']['title'] = DocEditor.docInfo.title;
          angular.element('.titleinput').scope().$apply();
          var docPath = workpieConfig.dataPath + workpieConfig.docFolder + DocEditor.docInfo.diskpath + DocEditor.docInfo.contentFilename;
          if(fs.existsSync(docPath))
          {
            console.log('读取文档内容文件： ' + docPath);
            var contentJson = fs.readJSONSync(docPath);
            DocEditor.docContent = contentJson['content'];
            console.log('文档内容： ', DocEditor.docContent);
            console.log('文档内容加载成功。');
          }
          else
          {
            DocEditor.docContent = '';
            console.log('文件不存在： ' + docPath);
          }
          angular.element('.editable').scope()['docEditor']['content'] = DocEditor.docContent;
          angular.element('.editable').scope().$apply();
        }
      });
    }

    //保存编辑器内容
    static saveEditorContent(scope){
      if(this.docInfo == null && (this.infoChanged || this.contentChanged))
      {
        this.docInfo = new DocInfo();
        this.infoChanged = true;
      }

      if(this.infoChanged || this.contentChanged)
      {
        var newContent: string = this.editor.elements[0].innerHTML;
        this.docInfo.contentSize = newContent.length;
        this.docContent = newContent;
        this.docInfo.modifyTime = new Date();
        wdDb.db.update({id: this.docInfo.id}, this.docInfo, {upsert: true}, function(err, numReplaced, upsert){
          if(err)
          {
            console.log('保存文档信息到数据库出错', err);
            return;
          }
          console.log(numReplaced, upsert);
          var docPath = workpieConfig.dataPath + workpieConfig.docFolder + DocEditor.docInfo.diskpath;
          console.log('准备保存文档内容到：' + docPath);
          if(!fs.existsSync(docPath)){
            fs.mkdirsSync(docPath);
          };
          var docInfoClone = JSON.parse(JSON.stringify(DocEditor.docInfo));
          docInfoClone['content'] = DocEditor.docContent;
          docInfoClone['text'] = DocEditor.editor.elements[0].innerText;

          fs.writeFileSync(docPath+DocEditor.docInfo.contentFilename, angular.toJson(docInfoClone));
          console.log('文档保存成功，id = ' + DocEditor.docInfo.id);

          DocEditor.infoChanged = false;
          DocEditor.contentChanged = false;
          console.log('文档信息保存成功，id = ' + DocEditor.docInfo.id);
          console.log('发送docSaved消息。');
          if(!scope)
            scope = angular.element('.editable').scope();
          scope.$emit('docSaved', 'SaveButton');
        })
      }
      else
        console.log('文档没有修改，无需保存');
    }

    //获取文档信息
    static getDocInfo(docid: string, callback){
      var result: DocInfo = null;
      wdDb.db.find({id: docid}).toArray(function(error, docs){
        if(error)
        {
          console.log('加载文档出错，docid = ' + docid, error);
          //todo: 显示加载错误消息
          alert('加载文档出错，docid = ' + docid);
        }
        else
        {
          if(docs.length > 1)
          {
            //如果查找到的大于一条，说明文档保存出错，需要整理数据
            alert('加载文档出错，找到都条id重复的文档，docid = ' + docid);
          }
          if(docs.length == 1)
          {
            console.log('找到文档，docid = ' + docid, docs[0]);
            result = docs[0];
            console.log('文档信息加载成功。');
          }
          else
          {
            console.log('没有找到文档，docid = ' + docid);
          }
        }
        callback(result);
      });
    }
  }

  //文档信息类
  export class DocInfo{
    id: string = '';                 //GUID
    title: string = '无标题';        //标题
    project: string = '未分类';      //所在项目
    path: string = '/未分类/';       //所在项目下的目录位置
    folderid: string = '';          //上级目录的id
    diskpath: string = '';          //磁盘上的存储位置
    contentFilename: string = '.content.txt';   //内容文件名称
    attachments: AttachmentInfo[] = []; //附件列表
    tags: string[] = [];            //tag列表
    contentSize: number = 0;        //内容大小
    createTime: Date = null;        //创建时间
    modifyTime: Date = null;        //最后修改时间
    constructor(){
      this.id = uuid.v4();
      this.createTime = new Date();
      this.modifyTime = new Date();
      var path = formatDate(this.createTime,  'yyyyMMdd') + '/' + this.id + '/';
      console.log('新建文档路径：' + path);
      this.diskpath = path;
    }
  }

  //附件信息类
  export class AttachmentInfo{
    id: string = '';                //GUID
    fileName: string  = '';         //文件名，包含扩展名
    extension: string = '';         //扩展名
    fileType: string = '';          //文件类型
    fileSize: number = 0;           //文件大小
    fileSizeDisplay: string = '0K'; //文件大小显示字符串
    fileAddTime: Date = null;       //文件添加到文档的时间
    fileCreateTime: Date = null;    //文件创建时间
    fileModifyTime: Date = null;    //文件最后修改时间
  }

  export function formatDate(date, style) {
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
  };

  DocEditor.initEditor();

  //内容修改事件
  DocEditor.editor.subscribe('editableInput', function (event, editable) {
      //console.log(event.target.innerHTML, event.srcElement.innerHTML);
      DocEditor.contentChanged = true;
  });

  //进入编辑状态事件
  DocEditor.editor.subscribe('editableClick', function (event, editable) {
      //console.log('begin edit.');
  });

  //离开编辑状态事件
  DocEditor.editor.subscribe('editableBlur', function (event, editable) {
      //console.log('end edit.');
  });

  //文件拖拽支持
  var holder = document.getElementById('container');
  holder.ondragover = function () {
    // this.className = 'hover';
    return false;
  };
  holder.ondragleave = holder.ondragend = function () {
    // this.className = '';
    return false;
  };
  holder.ondrop = function (e) {
    // this.className = '';
    e.preventDefault();

    var fs = require('fs-extra');
    var path = require('path');

    // var message = document.getElementById('message');
    // message.innerText = '文件复制中...';
    var message = '';
    for(var i =0; i< e.dataTransfer.files.length; i++)
    {
      var file = e.dataTransfer.files[i];
      var filename = path.basename(file.path);
      var desc = 'D:/@MyData/Dropbox/AppData/Desktop/WorkPie/' + filename;
      console.log('文件复制中...\n' + file + ' -> ' + desc);
      fs.copySync(file.path, desc);
      message += ' <br> ' + desc;
    }
    console.log(message);
    DocEditor.editor.elements[0].innerHTML += message;
    DocEditor.contentChanged = true;
    return false;
  };
}

export = WorkPie.Editor;
