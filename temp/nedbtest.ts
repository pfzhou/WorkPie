/// <reference path="../typings/nedb.d.ts"/>
/// <reference path="../typings/node-uuid.d.ts"/>

import nedb = require('nedb');
import uuid = require('node-uuid');

var db = new nedb({filename: 'db/datafile.db' });
db.loadDatabase(function (err) {    // Callback is optional
  if(err !== null)
    console.log(err);
});
console.log(db);
//var dba = {};
//dba.doc = new nedb('db/doc.db');
class WPDoc {
  id: string = uuid.v4();
  title: string = ''
  content: string = '';
  project: string = '未分类';
  path: string = '/未分类/';
  folderid: string = '';
  tags: string[] = [];
  createtime: Date = new Date();
  modefytime: Date = new Date();
  //infos: {size: 0},
  diskpath: string = ''
  constructor(){
  }
};
var doc = new WPDoc();
doc.title = '测试文档2';
console.log(doc);
db.insert(doc, function (err, newDoc) {
  if(err !== null){
    console.log(err);
    console.log(newDoc);
  }
});

db.find({ title: { $regex: /测试文档/} }, function (err, docs) {
  //console.log(docs.length);
  console.log(docs);
});

db.find({ title:  /测试文档/ }, function (err, docs) {
  //console.log(docs.length);
  console.log(docs);
});
