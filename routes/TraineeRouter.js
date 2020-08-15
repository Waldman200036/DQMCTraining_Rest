/* eslint-disable no-param-reassign */
/* jshint esversion: 6 */
const express = require('express');

function routes(Trainee) {
  const TraineeRouter = express.Router();
  TraineeRouter.route('/Trainees')
    .post((req, res) => {
      const Trainee = new Trainee(req.body);
      Trainee.save();
      return res.status(201).json(Trainee);
    })
    .get((req, res) => {
      const query = {};
      Trainee.find(query, (err, Trainees) => {
        if (err) {
          return res.send(err);
        }
        return res.json(Trainees);
      });
    });

  // Middleware function for '/Trainees/:TraineeId' route
  TraineeRouter.use('/Trainees/:TraineeId', (req, res, next) => {
    Trainee.findById(req.params.TraineeId, (err, Trainee) => {
      if (err) {
        return res.send(err);
      }
      if (Trainee) {
        req.Trainee = Trainee;
        return next();
      }
      // Error Trainee does not exist
      return res.sendStatus(404);
    });
  });
  TraineeRouter.route('/Trainees/:TraineeId')
    .get((req, res) => res.json(req.Trainee))
    .put((req, res) => {
      const {
        Trainee
      } = req;
      Trainee.firstName = req.body.firstName;
      Trainee.lastName = req.body.lastName;
      Trainee.date = req.body.date;
      Trainee.Time = req.body.Time;
      req.Trainee.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(Trainee);
      });
    })
    .patch((req, res) => {
      const {
        Trainee
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
        Trainee[key] = value;
      });
      req.Trainee.save((err) => {
        if (err) {
          return res.send(err);
        }
        return res.json(Trainee);
      });
    });
  return TraineeRouter;
}

module.exports = routes;