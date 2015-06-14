var Db = require('tingodb')().Db;
var fs = require('fs-extra');
var content = fs.readFileSync('./temp/sedit.html', 'utf-8');
var db = new Db('./temp/db', {});
var collection = db.collection("testdb");
collection.insert({ hello: content }, function (err, result) {
    collection.findOne({ hello: 'world_safe2' }, function (err, item) {
    });
});
collection.find({ hello: 'world_safe2' }, function (err, docs) {
    console.log(docs.count());
    if (docs.length > 0) {
        console.log(docs[0]._id);
    }
});
