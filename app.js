/* jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();

const port = process.env.PORT || 5000;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const authRouter = require('./src/routes/authRoutes');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/auth', authRouter);

const updateDocument = function (db, doc, col,callback) {
  // Get the documents collection
  const collection = db.collection(col);
  // Update document where a is 2, set b equal to 1
  collection.updateOne({
    email: doc.email
  }, {
    $set: {
      firstname: doc.firstname,
      lastname: doc.lastname,
      Organization: doc.Organization,
      branch: doc.branch,
      facility: doc.facility,
      phone: doc.phone,
      date_select_0: doc.date_select_0,
      time_select_0: doc.time_select_0,
      date_select_1: doc.date_select_1,
      time_select_1: doc.time_select_1,
      date_select_2: doc.date_select_2,
      time_select_2: doc.time_select_2,
      date_select_3: doc.date_select_3,
      time_select_3: doc.time_select_3,
      timestamp: doc.timestamp
    }
  }, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    debug("Updated the document with the email a equal to email");
    callback(result);
  });
};

const insertDocument = function (db, doc, col, callback) {
  // Get the documents collection
  const collection = db.collection(col);
  // Insert some documents
  collection.insertOne(doc, function (err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    debug("Inserted 1 documents into the collection");
    debug(result);
    callback(result);
  });
};

const findDocuments = function (db, email, callback) {
  // Get the documents collection
  const collection = db.collection('trainee');
  // Find some documents
  collection.find({
    email: email
  }).toArray(function (err, docs) {
    assert.equal(err, null);
    debug("Found the following records");
    // debug(docs);
    callback(docs);
  });
};
app.get('/', (req, resp) => {
  console.log('Welcome to my API!!!');
  resp.send('Welcome to my API!!!');
});

app.get('/apiTraining/get/:email', (req, res) => {

  // Local Connection URL
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'Training';
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);
    debug("Connected successfully to server");

    const db = client.db(dbName);

    findDocuments(db, req.params.email, function (results) {
      client.close();
      return res.json({
        message: 'Handling GET request to /apiTraining/get/email:/',
        body: results
      });

    });

  });
});
app.post('/apiTraining/post', (req, res) => {

  // Local Connection URL
  // const url = 'mongodb://localhost:27017';
  const url = 'mongodb+srv://dbAPIUser:aAzzhulCjjjw1a6R@cluster0.1mk1d.mongodb.net/Training?retryWrites=true&w=majority';
  // Database Name
  const dbName = 'Training';
  // Use connect method to connect to the server
  MongoClient.connect(url, function (err, client) {

    assert.equal(null, err);
    debug("Connected successfully to server");

    const db = client.db(dbName);

    updateDocument(db, req.body, 'trainee', function (results) {
      assert.equal(err, null);
      assert.equal(1, results.result.n);
      debug('Finished asserts');
      client.close();
      debug(`results from updateDocument call: ${results}`);
      return res.json({
        message: 'Handling PUT request to /Trainees',
        body: results
      });

    });
//TODO write method to skip insert if documnent was updated or run if not updated
    // insertDocument(db, req.body, 'trainee', function (results) {
    //   client.close();
    //   return res.json({
    //     message: 'Handling GET request to /Trainees',
    //     body: results
    //   });

    // });

  });
});

app.post('/auth', (req, resp) => {
  console.log('You Posted to my auth API!!!');
  resp.send('You Posted to my auth API!!!');
});
/* app.get('/TrainingApi/Trainees', (req, res ) =>{
  res.send('Request Recieved!!');
}); */

app.listen(port, () => {
  debug(`listening on ${chalk.green(port)}`);
});