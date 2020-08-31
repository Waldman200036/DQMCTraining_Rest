/* jshint esversion: 8 */
const express = require('express');

const debug = require('debug')('app:authRoutes');

// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// const updateDocument = function update(db, doc, callback) {
//   // Get the documents collection
//   const collection = db.collection(doc);
//   // Update document where a is 2, set b equal to 1
//   collection.updateOne({
//     email: doc.email,
//   }, {
//     $set: {
//       b: 1,
//     },
//   }, (err, result) => {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     debug('Updated the document with the field a equal to 2');
//     callback(result);
//   });
// };
// const insertDocument = function(db, doc, col, callback) {
//   // Get the documents collection
//   const collection = db.collection(col);
//   // Insert some documents
//   collection.insertOne(doc, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     assert.equal(1, result.ops.length);
//     debug("Inserted 1 documents into the collection");
//     debug(result);
//     callback(result);
//   });
// }

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     debug("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }
// const findDocuments = function(db,doc, callback) {
//   // Get the documents collection
//   const collection = db.collection(doc);
//   // Find some documents
//   collection.find({email: doc.email}).toArray(function(err, docs) {
//     assert.equal(err, null);
//     debug("Found the following records");
//     // debug(docs);
//     callback(docs);
//   });
// }


// const indexCollection = function(db, callback) {
//   db.collection('documents').createIndex(
//     { "a": 1 },
//       null,
//       function(err, results) {
//         debug(results);
//         callback();
//     }
//   );
// };
// const removeDocument = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('documents');
//   // Delete document where a is 3
//   collection.deleteOne({ a : 3 }, function(err, result) {
//     assert.equal(err, null);
//     assert.equal(1, result.result.n);
//     debug("Removed the document with the field a equal to 3");
//     callback(result);
//   });
// }

const authRouter = express.Router();

function router() {
  authRouter.route('/registrar').
  post((req, res) =>{
  // Local Connection URL
   // const url = 'mongodb://localhost:27017';
   // const url = 'mongodb+srv://dbAPIUser:aAzzhulCjjjw1a6R@cluster0.1mk1d.mongodb.net/Training?retryWrites=true&w=majority';
  // Database Name
 // const dbName = 'Training';
  // Use connect method to connect to the server
  // debug(url);
    //    MongoClient.connect(url, function(err, client) {
       
    //   assert.equal(null, err);
    //   debug("Connected successfully to server");

    //   const db = client.db(dbName); 

    //   insertDocument(db,req.body,'trainee', function(results){
    //     client.close();        
    //    return res.json({
    //       message: 'Handling GET request to /Trainees',
    //       body: results
    //     });        

    //   });
      
    // });

  });

  return authRouter;
}

module.exports = router;