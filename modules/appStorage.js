var tingoDB = require('tingodb')().Db;
'use strick';
var WorkPie;
(function (WorkPie) {
    var Storage;
    (function (Storage) {
        var database = (function () {
            function database(dbPath, dbName) {
                this.db = null;
                this.workpieDB = null;
                this.workpieDB = new tingoDB(dbPath, {});
                this.db = this.workpieDB.collection(dbName + '.db');
            }
            return database;
        })();
        Storage.database = database;
    })(Storage = WorkPie.Storage || (WorkPie.Storage = {}));
})(WorkPie || (WorkPie = {}));
module.exports = WorkPie.Storage;
