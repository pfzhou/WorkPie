/// <reference path="../typings/node.d.ts"/>
/// <reference path="../typings/fs-extra.d.ts"/>


import path = require('path');
import fs = require('fs-extra');
import util = require('util');

var libPath = '../lib-test';
var libbakPath = '../lib-bak/';
var libReadmePath = libbakPath + 'readme.txt';

function copyFileToLib(desc:string, sourcePath: string, sourceNames: string[], destNames?: string[])
{
  var ver = getVersion(sourcePath);
  verJson[desc] = ver;
  console.log('  2.%d、\t复制%s %s：\t\t开始...', num, desc,ver);
  for(var i = 0; i < sourceNames.length; i++)
  {
    var sourceName = sourceNames[i];
    fs.copySync(sourcePath+sourceNames[i], libbakPath+(destNames==null ? "" : destNames[i]));
  }

  console.log('  2.%d、\t复制%s %s：\t\t完成', num, desc, ver);
  num++
}

function getVersion(path: string)
{
  var jsonFiles = ['package.json', 'bower.json', '.bower.json'];
  var ver: string = '?';
  for(var i = 0; i < jsonFiles.length; i++)
  {
    if(fs.existsSync(path+jsonFiles[i]))
    {
      var jsonObj= fs.readJsonSync(path+jsonFiles[i])
      ver = jsonObj['version'];

      if(ver != undefined)
      {
        break;
      }
    }
  }
  if(ver == undefined)
  {ver = '?';}
  return ver;
}

//1、删除备份目录
console.log('1、\t删除备份目录：\t\t开始...');
if(fs.existsSync(libbakPath))
{
  fs.removeSync(libbakPath);
}
console.log('1、\t删除备份目录：\t\t完成');
//
// //2、修改原lib 为lib-bak
// console.log('2、   备份lib目录：开始...');
// if(fs.existsSync(libPath))
// {
//   fs.renameSync(libPath, libbakPath);
// }
// console.log('2、   备份lib目录：完成');

//3、复制文件
console.log('2、\t复制文件：\t\t开始...');
var num: number = 1;
var verJson= JSON.parse('{}');

copyFileToLib('medium-editor', '../bower_components/medium-editor/', ['dist/']);
copyFileToLib('bootstrap', '../bower_components/bootstrap/', ['dist/']);
copyFileToLib('angular', '../bower_components/angular/',['angular.js', 'angular.min.js'], ['js/angular.js', 'js/angular.min.js']);
copyFileToLib('angular-route', '../bower_components/angular-route/',['angular-route.js', 'angular-route.min.js'], ['js/angular-route.js', 'js/angular-route.min.js']);
copyFileToLib('jquery', '../bower_components/jquery/', ['dist/jquery.js', 'dist/jquery.min.js'],['js/jquery.js', 'js/jquery.min.js']);
copyFileToLib('underscore', '../bower_components/underscore/', ['underscore.js','underscore-min.js'],['js/underscore.js','js/underscore-min.js']);
copyFileToLib('font-awesome', '../bower_components/font-awesome-4.3.0/', ['css/','fonts/'],['css/','fonts/']);

//写readme文件，记录版本号
fs.writeFileSync(libReadmePath, JSON.stringify(verJson));
console.log('2、   复制文件：\t\t完成');
