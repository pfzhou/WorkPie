/// <reference path="../typings/nedb.d.ts"/>
/// <reference path="../typings/node-uuid.d.ts"/>

import nedb = require('nedb');
import uuid = require('node-uuid');

  // 数据库存储类
  export class database{
    db: nedb = null;
    constructor(dbPath: string, dbName: string)
    {
      this.db = new nedb({filename: dbPath + dbName + '.db'});
      this.db.loadDatabase(function (err) {    // Callback is optional
        if(err)
          console.log(err);
      });
      console.log(dbName + ' count = ', this.db);
    }
  }