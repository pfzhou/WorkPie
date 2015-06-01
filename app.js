/// <reference path="./typings/angular.d.ts"/>
/// <reference path="./typings/node-webkit.d.ts"/>
/// <reference path="./typings/node.d.ts"/>
/// <reference path="./typings/fs-extra.d.ts"/>
/// <reference path="./modules/appStorage.ts"/>
var fs = require('fs-extra');
var nw = require('nw.gui');
var storage = require('./modules/appStorage');
var workpieApp = angular.module('workpieApp', ['commonDirective', 'workspaceDirective']);
// 全局配置
var appConfig = (function () {
    function appConfig(config) {
        this.dataPath = nw.App.manifest["dataPath"];
        this.dbFolder = 'db/';
        this.docFolder = 'doc/';
        this.prjFolder = 'prj/';
        this.dataPath = config['dataPath'] || this.dataPath;
        this.dbFolder = config['dbFolder'] || this.dbFolder;
        this.docFolder = config['docFolder'] || this.docFolder;
        this.prjFolder = config['prjFolder'] || this.prjFolder;
    }
    return appConfig;
})();
var config = new appConfig(JSON.parse(fs.readFileSync('config.json', 'utf-8')));
console.log('全局配置：', config);
//workdoc db
var wdDb = new storage.database(config.dataPath + config.dbFolder, 'workdoc');
