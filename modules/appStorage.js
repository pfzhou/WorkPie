/// <reference path="../typings/nedb.d.ts"/>
/// <reference path="../typings/node-uuid.d.ts"/>
var nedb = require('nedb');
// 数据库存储类
var database = (function () {
    function database(dbPath, dbName) {
        this.db = null;
        this.db = new nedb({ filename: dbPath + dbName + '.db' });
        this.db.loadDatabase(function (err) {
            if (err)
                console.log(err);
        });
        console.log(dbName + ' count = ', this.db);
    }
    return database;
})();
exports.database = database;
