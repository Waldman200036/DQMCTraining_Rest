/* jshint esversion: 6 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');

// const uri = 'mongodb+srv://dbAPIUser:' + process.env.MONGO_ATLAS_PW + '@cluster0.1mk1d.mongodb.net/Training?retryWrites=true&w=majority';
// const uri2 = 'mongodb://localhost/Training';
const app = express();

const port = process.env.PORT || 5000;
// const Trainee = require('./models/TraineeModel');
const TraineeRouter = require('./routes/TraineeRouter');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/TrainingApi', TraineeRouter);

app.get('/', (req, resp) => {
  console.log('Welcome to my API!!!');
  resp.send('Welcome to my API!!!');
});

app.listen(port, () => {
  debug(`listening on ${chalk.green(port)}`);
});