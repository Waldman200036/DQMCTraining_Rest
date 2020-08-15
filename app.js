/* jshint esversion: 6 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const chalk = require('chalk');

const app = express();
const db = mongoose.connect('mongodb://localhost/training', {
  useNewUrlParser: true, useUnifiedTopology: true
});
const port = process.env.PORT || 5000;
const Trainee = require('./models/TraineeModel');
const TraineeRouter = require('./routes/TraineeRouter')(Trainee);

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use('/TrainingApi', TraineeRouter);

app.get('/', (req, resp) => {
  resp.send('Welcome to my API!');
});

app.listen(port, () => {
  debug(`listening on ${chalk.green(port)}`);
});