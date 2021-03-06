/// <reference path="../typings/node.d.ts"/>
/// <reference path="../typings/fs-extra.d.ts"/>
var fs = require('fs-extra');
var libPath = '../lib-test';
var libbakPath = '../lib-bak/';
var libReadmePath = libbakPath + 'readme.txt';
var num = 1;
var verJson = JSON.parse('{}');
function copyFileToLib(desc, sourcePath, sourceNames, destNames) {
    var ver = getVersion(sourcePath);
    verJson[desc] = ver;
    console.log('  2.%d、\t复制%s %s：\t\t开始...', num, desc, ver);
    for (var i = 0; i < sourceNames.length; i++) {
        var sourceName = sourceNames[i];
        fs.copySync(sourcePath + sourceNames[i], libbakPath + (destNames == null ? "" : destNames[i]));
    }
    console.log('  2.%d、\t复制%s %s：\t\t完成', num, desc, ver);
    num++;
}
function getVersion(path) {
    var jsonFiles = ['package.json', 'bower.json', '.bower.json'];
    var ver = '?';
    for (var i = 0; i < jsonFiles.length; i++) {
        if (fs.existsSync(path + jsonFiles[i])) {
            var jsonObj = fs.readJsonSync(path + jsonFiles[i]);
            ver = jsonObj['version'];
            if (ver != undefined) {
                break;
            }
        }
    }
    if (ver == undefined) {
        ver = '?';
    }
    return ver;
}
console.log('1、\t删除备份目录：\t\t开始...');
if (fs.existsSync(libbakPath)) {
    fs.removeSync(libbakPath);
}
console.log('1、\t删除备份目录：\t\t完成');
console.log('2、\t复制文件：\t\t开始...');
copyFileToLib('medium-editor', '../bower_components/medium-editor/', ['dist/']);
copyFileToLib('bootstrap', '../bower_components/bootstrap/', ['dist/']);
copyFileToLib('angular', '../bower_components/angular/', ['angular.js', 'angular.min.js'], ['js/angular.js', 'js/angular.min.js']);
copyFileToLib('angular-route', '../bower_components/angular-route/', ['angular-route.js', 'angular-route.min.js'], ['js/angular-route.js', 'js/angular-route.min.js']);
copyFileToLib('angular-sanitize', '../bower_components/angular-sanitize/', ['angular-sanitize.js', 'angular-sanitize.min.js'], ['js/angular-sanitize.js', 'js/angular-sanitize.min.js']);
copyFileToLib('jquery', '../bower_components/jquery/', ['dist/jquery.js', 'dist/jquery.min.js'], ['js/jquery.js', 'js/jquery.min.js']);
copyFileToLib('underscore', '../bower_components/underscore/', ['underscore.js', 'underscore-min.js'], ['js/underscore.js', 'js/underscore-min.js']);
copyFileToLib('font-awesome', '../bower_components/font-awesome-4.3.0/', ['css/', 'fonts/'], ['css/', 'fonts/']);
fs.writeFileSync(libReadmePath, JSON.stringify(verJson));
console.log('2、   复制文件：\t\t完成');
