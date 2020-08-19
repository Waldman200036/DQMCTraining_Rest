/* jshint esversion: 6 */
const express = require('express');
const Trainee = require('../mongodb/save');
function routes() {
  const traineeRouter = express.Router();
  traineeRouter.route('/Trainees')
    .post((req, res) => {
      const trainee = req.body;
/*       Trainee.SaveData(trainee).then(result => {
        console.log(result);
      })
      .catch(err => console.log(err)); */
    
      return res.status(201).json({
        message: 'Handling POST request to /Trainees',
        trainee
      });
    })
    .get((req, res) => {
      const query = {};
      Trainee.find(query, (err, Trainees) => {
        if (err) {
          return res.send(err);
        }
        return res.json({
          message: 'Handling GET request to /Trainees',
          Trainees
        });
      });
    });

  // Middleware function for '/Trainees/:TraineeId' route
  traineeRouter.use('/Trainees/:TraineeId', (req, res, next) => {
    Trainee.findById(req.params.traineeId, (err, trainee) => {
      if (err) {
        return res.send(err);
      }
      if (trainee) {
        req.trainee = trainee;
        return next();
      }
      // Error Trainee does not exist
      return res.sendStatus(404);
    });
  });
  traineeRouter.route('/Trainees/:TraineeId')
    .get((req, res) => res.json(req.trainee))
    .put((req, res) => {
      const {
        trainee
      } = req;
      trainee.firstName = req.body.firstName;
      trainee.lastName = req.body.lastName;
      trainee.date = req.body.date;
      trainee.Time = req.body.Time;
      req.trainee.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(trainee);
      });
    })
    .patch((req, res) => {
      const {
        trainee
      } = req;
      // eslint-disable-next-line no-underscore-dangle
      if (req.body._id) {
        // If accidentially set get rid of it
        // eslint-disable-next-line no-underscore-dangle
        delete req.body._id;
      }
      Object.entries(req.body).forEach((item) => {
        const key = item[0];
        const value = item[1];
        trainee[key] = value;
      });
      req.trainee.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(trainee);
      });
    });
  return traineeRouter;
}

module.exports = routes;