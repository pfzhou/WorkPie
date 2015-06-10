var nedb = require('nedb');
'use strick';
var WorkPie;
(function (WorkPie) {
    var Storage;
    (function (Storage) {
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
        Storage.database = database;
    })(Storage = WorkPie.Storage || (WorkPie.Storage = {}));
})(WorkPie || (WorkPie = {}));
module.exports = WorkPie.Storage;
