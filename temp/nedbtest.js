/// <reference path="../../typings/nedb.d.ts"/>
var uuid = require('../../node_modules/node-uuid');
var dbpath = '../../node_modules/nedb';
var nedb = require(dbpath);
//import nedb = require('nedb');
var db = new nedb({ filename: 'db/datafile.db' });
db.loadDatabase(function (err) {
    if (err !== null)
        console.log(err);
});
console.log(db);
//var dba = {};
//dba.doc = new nedb('db/doc.db');
var WPDoc = (function () {
    function WPDoc() {
        this.id = uuid.v4;
        this.title = '';
        this.content = '';
        this.project = '未分类';
        this.path = '/未分类/';
        this.folderid = '';
        this.tags = [];
        this.createtime = new Date();
        this.modefytime = new Date();
        //infos: {size: 0},
        this.diskpath = '';
    }
    return WPDoc;
})();
;
var doc = new WPDoc();
doc.title = '测试文档3';
console.log(doc);
db.insert(doc, function (err, newDoc) {
  if(err !== null){
    console.log(err);
    console.log(newDoc);
  }
});
db.find({ title: { $regex: /测试文档2/ } }, function (err, docs) {
    //console.log(docs.length);
    console.log(docs);
});
db.find({ title: /测试文档2/ }, function (err, docs) {
    //console.log(docs.length);
    console.log(docs);
});
