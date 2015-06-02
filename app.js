var fs = require('fs-extra');
var nw = require('nw.gui');
var storage = require('./modules/appStorage');
var workpieApp = angular.module('workpieApp', ['commonDirective', 'workspaceDirective']);
// 全局配置
var appConfig = (function () {
    function appConfig(configFile) {
        this.dataPath = nw.App.manifest["dataPath"];
        this.dbFolder = 'db/';
        this.docFolder = 'doc/';
        this.prjFolder = 'prj/';
        var config = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
        if (process.platform != 'darwin') {
            this.dataPath = config['dataPathWin'] || this.dataPath;
        }
        else {
            this.dataPath = config['dataPathMacOS'] || this.dataPath;
        }
        this.dbFolder = config['dbFolder'] || this.dbFolder;
        this.docFolder = config['docFolder'] || this.docFolder;
        this.prjFolder = config['prjFolder'] || this.prjFolder;
        console.log('操作系统：', process.platform);
    }
    return appConfig;
})();
var workpieConfig = new appConfig('config.json');
console.log('全局配置：', workpieConfig);
//workdoc db
var wdDb = new storage.database(workpieConfig.dataPath + workpieConfig.dbFolder, 'workdoc');
