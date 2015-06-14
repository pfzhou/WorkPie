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
      // this.db.loadDatabase(function (err) {    // Callback is optional
      //   if(err)
      //     console.log(err);
      // });
      console.log(dbName + ' = ', this.db);
      //new nedb({filename: dbPath + dbName + '.db'})
    }
  }
}

export = WorkPie.Storage;
