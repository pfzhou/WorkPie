var Db = require('tingodb')().Db;
import fs = require('fs-extra');

var content = fs.readFileSync('./temp/sedit.html', 'utf-8');
//console.log(content);
var db = new Db('./temp/db', {});
// Fetch a collection to insert document into
var collection = db.collection("testdb");
// Insert a single document
collection.insert({hello:content}, function(err, result) {
    //console.log(result);
  // Fetch the document
  collection.findOne({hello:'world_safe2'}, function(err, item) {
    //console.log(item);
  })
});


//collection.find({ hello: { $regex: /world_safe2/} }, function (err, docs) {
collection.find({ hello: 'world_safe2' }, function (err, docs) {
  //debugger;
  //console.log(docs.length);
  console.log(docs.count());
  if(docs.length > 0)
  {
    console.log(docs[0]._id);
  }
});
