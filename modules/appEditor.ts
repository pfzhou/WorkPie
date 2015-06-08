import fs = require('fs-extra');
import uuid = require('node-uuid');
import storage = require('./appStorage');

//编辑器类
declare var MediumEditor: any;

// declare module appEditor{
//   export = 'appEditor';
// }

module appEditor{
//文档编辑器操作类
export class DocEditor{
  //编辑器对象实例
  static editor: any = null;
  private static docInfo: DocInfo = null;
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
    this.docInfo = getDocInfo(docid);
    if(this.docInfo)
    {
      var docPath = workpieConfig.dataPath + workpieConfig.docFolder + this.docInfo.diskpath;
      console.log('读取文档内容文件： ' + docPath);
      var contentJson = fs.readJSONSync(docPath);
      var docContent = contentJson['content'];
      console.log('文档内容： ', docContent);
      this.setEditorContent(docContent);
      console.log('文档内容加载成功。');
    }
  }
  //保存编辑器内容
  static saveEditorContent(){
    var docContent: string = this.editor.elements[0].innerHTML;
    debugger;
    this.docInfo.contentSize = docContent.length;
    this.docInfo.modifyTime = new Date();
    wdDb.db.update({id: this.docInfo.id}, this.docInfo, {upsert: true }, function(err, numReplaced, upsert){
      if(err)
        console.log('保存文档信息出错',err);
      console.log(numReplaced, upsert);
    })
    var docPath = workpieConfig.dataPath + workpieConfig.docFolder + this.docInfo.diskpath;
    console.log('准备保存文档内容到：' + docPath);
    var contentJson = JSON.parse('{}');
    contentJson['content'] = this.editor.elements[0].innerHTML;
    fs.writeFileSync(docPath, JSON.stringify(contentJson));
    console.log('文档保存成功，id = ' + this.docInfo.id);
  }
  //设置编辑器的文档内容（包含html格式的）
  static setEditorContent(content: string){
    this.editor.elements[0].innerHTML = content;
  }
}

//文档信息类
export class DocInfo{
  id: string = '';                //GUID
  title: string = '';             //标题
  project: string = '未分类';      //所在项目
  path: string = '/未分类/';       //所在项目下的目录位置
  folderid: string = '';          //上级目录的id
  diskpath: string = '';          //磁盘上的存储位置
  attachments: AttachmentInfo[] = []; //附件列表
  tags: string[] = [];            //tag列表
  contentSize: number = 0;        //内容大小
  createTime: Date = null;        //创建时间
  modifyTime: Date = null;        //最后修改时间
  constructor(){
    this.id = uuid.v4();
    this.createTime = new Date();
    this.modifyTime = new Date();
    var path = formatDate(this.createTime,  'yyyyMMdd') + '/' + this.id + '.json/';
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

//内容修改事件
// DocEditor.editor.subscribe('editableInput', function (event, editable) {
//     //...
//     //console.log('change: ' + editable.innerHTML, event);
//     console.log(event.target.innerHTML, event.srcElement.innerHTML);
// });
//
// //进入编辑状态事件
// DocEditor.editor.subscribe('editableClick', function (event, editable) {
//     //...
//     console.log('begin edit.');
// });
//
// //离开编辑状态事件
// DocEditor.editor.subscribe('editableBlur', function (event, editable) {
//     //...
//     console.log('end edit.');
// });

var formatDate = function(date, style) {
  var y = date.getFullYear();
  var M = "0" + (date.getMonth() + 1);
  M = M.substring(M.length - 2);
  var d = "0" + date.getDate();
  d = d.substring(d.length - 2);
  // var h = "0" + date.getHours();
  // h = h.substring(h.length - 2);
  // var m = "0" + date.getMinutes();
  // m = m.substring(m.length - 2);
  // var s = "0" + date.getSeconds();
  // s = s.substring(s.length - 2);
  return style.replace('yyyy', y).replace('MM', M).replace('dd', d); //.replace('hh', h).replace('mm', m).replace('ss', s);
};

function getDocInfo(docid: string): DocInfo{
  var result: DocInfo = null;
  wdDb.db.find({id: docid}, function(error, docs){
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
        result = JSON.parse(docs[0]);
        console.log('文档信息加载成功。');
      }
      else
      {
        console.log('没有找到文档，docid = ' + docid);
      }
    }
  });
  return result;
}

appEditor.DocEditor.initEditor();

//export = appEditor;
}
