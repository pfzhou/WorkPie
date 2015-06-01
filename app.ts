/// <reference path="./typings/angular.d.ts"/>
/// <reference path="./typings/node-webkit.d.ts"/>
/// <reference path="./typings/node.d.ts"/>
/// <reference path="./typings/fs-extra.d.ts"/>
/// <reference path="./modules/appStorage.ts"/>


import path = require('path');
import fs = require('fs-extra');
import nw = require('nw.gui');
import storage = require('./modules/appStorage');

var workpieApp = angular.module('workpieApp', ['commonDirective', 'workspaceDirective']);

// 全局配置
class appConfig{
  dataPath: string = nw.App.manifest["dataPath"];
  dbFolder: string = 'db/';
  docFolder: string = 'doc/';
  prjFolder: string = 'prj/';
  constructor(config: Object)
  {
    this.dataPath = config['dataPath'] || this.dataPath;
    this.dbFolder = config['dbFolder'] || this.dbFolder;
    this.docFolder = config['docFolder'] || this.docFolder;
    this.prjFolder = config['prjFolder'] || this.prjFolder;
  }
}
var config: appConfig = new appConfig(JSON.parse(fs.readFileSync('config.json', 'utf-8')));
console.log('全局配置：', config);

//workdoc db
var wdDb = new storage.database(config.dataPath + config.dbFolder, 'workdoc');
