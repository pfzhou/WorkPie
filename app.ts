import path = require('path');
import fs = require('fs-extra');
import nw = require('nw.gui');
'use strick';

var win = nw.Window.get();
var tray = new nw.Tray({ title: nw.App.manifest["window"]["title"], icon: nw.App.manifest["window"]["icon"] });
tray.tooltip = 'Open WorkPie';

var isShowWindow = true;
//tray.menu = menu;
//click事件
tray.on('click',function(){
  if(isShowWindow)
  {
    win.hide();
    isShowWindow = false;
  }
  else
  {
    win.show();
    isShowWindow = true;
  }
});

//注册Angular Modules
var workpieApp = angular.module('workpieApp', ['ngSanitize', 'commonDirective', 'workspaceDirective']);

// 全局配置
class appConfig{
  dataPath: string = '';
  dbFolder: string = 'db/';
  docFolder: string = 'doc/';
  prjFolder: string = 'prj/';
  constructor(configFile: string)
  {
    var config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
    if (process.platform != 'darwin')
    {
      this.dataPath = config['dataPathWin'] || this.dataPath;
    }
    else
    {
      this.dataPath = config['dataPathMacOS'] || this.dataPath;
    }
    this.dbFolder = config['dbFolder'] || this.dbFolder;
    this.docFolder = config['docFolder'] || this.docFolder;
    this.prjFolder = config['prjFolder'] || this.prjFolder;
    console.log('操作系统：', process.platform);
  }
}
var workpieConfig: appConfig = new appConfig('config.json');
console.log('全局配置：', workpieConfig);

import storage = require('./modules/appStorage');
var wdDb = new storage.database(workpieConfig.dataPath + workpieConfig.dbFolder, 'working');
