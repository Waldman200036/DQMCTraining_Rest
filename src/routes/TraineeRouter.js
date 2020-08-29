/* jshint esversion: 6 */
const express = require('express');
const { debug } = require('console');
function routes() {
  debug('hit route');
  const traineeRouter = express.Router();
  debug('step 1');
  debug(traineeRouter);

  traineeRouter.route('TrainingApi/Trainees')
    .post((req, res) => {
        debug('step 2');
    
      return res.status(201).json({
        message: 'Handling POST request to /',
        trainee
      });
    })
    .get((req, res) => {
       return res.json({
          message: 'Handling GET request to /Trainees',
          Trainees
        });

      debug('step 3')
    });

  return traineeRouter;
}

module.exports = routes;