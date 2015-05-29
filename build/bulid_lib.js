/// <reference path="../typings/node.d.ts"/>
/// <reference path="../typings/fs-extra.d.ts"/>
var fs = require('fs-extra');
var libPath = '../lib-test';
var libbakPath = '../lib-bak/';
var libReadmePath = libbakPath + 'readme.txt';
var verJson = JSON.parse('{}');
function copyFileToLib(desc, sourcePath, sourceNames, destNames) {
    console.log('  2.%d、\t复制%s：\t开始...', num, desc);
    for (var i = 0; i < sourceNames.length; i++) {
        var sourceName = sourceNames[i];
        fs.copySync(sourcePath + sourceNames[i], libbakPath + (destNames == null ? "" : destNames[i]));
    }
    verJson[desc] = getVersion(sourcePath);
    console.log('  2.%d、\t复制%s：\t完成', num, desc);
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
//1、删除备份目录
console.log('1、\t删除备份目录：\t开始...');
if (fs.existsSync(libbakPath)) {
    fs.removeSync(libbakPath);
}
console.log('1、\t删除备份目录：\t完成');
//
// //2、修改原lib 为lib-bak
// console.log('2、   备份lib目录：开始...');
// if(fs.existsSync(libPath))
// {
//   fs.renameSync(libPath, libbakPath);
// }
// console.log('2、   备份lib目录：完成');
//3、复制文件
console.log('2、\t复制文件：\t开始...');
var num = 1;
copyFileToLib('medium-editor', '../bower_components/medium-editor/', ['dist/']);
copyFileToLib('bootstrap', '../bower_components/bootstrap/', ['dist/']);
copyFileToLib('angular', '../bower_components/angular/', ['angular.js', 'angular.min.js'], ['js/angular.js', 'js/angular.min.js']);
console.log(JSON.stringify(verJson));
fs.writeFileSync(libReadmePath, JSON.stringify(verJson));
console.log('2、   复制文件：\t完成');
