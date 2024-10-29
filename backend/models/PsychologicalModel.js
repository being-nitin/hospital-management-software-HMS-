const mongoose = require('mongoose');

const psychologicalInfo = new mongoose.Schema({
  appointment : { type : mongoose.ObjectId , ref : 'appointment'},
  patient : { type : mongoose.ObjectId , ref : 'patientDetails'},
  motherTongue: { type: String },
  date: { type: Date, required: true },
  
});

module.exports = mongoose.model('psychologicalInfo', psychologicalInfo);
