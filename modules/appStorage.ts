import nedb = require('nedb');
'use strick';

module WorkPie.Storage{
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
      //new nedb({filename: dbPath + dbName + '.db'})
    }
  }
}

export = WorkPie.Storage;