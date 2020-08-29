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

const insertDocument = function(db, doc, col, callback) {
  // Get the documents collection
  const collection = db.collection(col);
  // Insert some documents
  collection.insertOne(doc, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    debug("Inserted 1 documents into the collection");
    debug(result);
    callback(result);
  });
}

app.get('/', (req, resp) => {
  console.log('Welcome to my API!!!');
  resp.send('Welcome to my API!!!');
});

app.post('/apiTraining/post', (req, res) => {
  
  // Local Connection URL
   const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = 'Training';
  // Use connect method to connect to the server
       MongoClient.connect(url, function(err, client) {
       
      assert.equal(null, err);
      debug("Connected successfully to server");

      const db = client.db(dbName); 

      insertDocument(db,req.body,'trainee', function(results){
       return res.json({
          message: 'Handling GET request to /Trainees',
          body: results
        });        
        client.close();
      });
      
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