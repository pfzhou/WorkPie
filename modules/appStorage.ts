//import nedb = require('nedb');
var tingoDB = require('tingodb')().Db;
'use strick';

module WorkPie.Storage{
  // 数据库存储类
  export class database{
    db: any = null;
    workpieDB: any = null;
    constructor(dbPath: string, dbName: string)
    {
      this.workpieDB = new tingoDB(dbPath, {});
      this.db = this.workpieDB.collection(dbName + '.db');
    }
  }
}

export = WorkPie.Storage;
