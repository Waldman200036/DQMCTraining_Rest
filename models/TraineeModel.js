/* jshint esversion: 6 */
const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const TraineeModel = new Schema({
    firstName: { type:String } , 
    lastName: { type: String },
    Organization:   { type: String },
    branch:  { type: String },
    facility:  { type: String },
    email:  { type: String },
    phone:  { type: String },
    date: { type: Date },
    Time: { type: Date },
});

module.exports = mongoose.model('Trainee', TraineeModel);
