const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;

const VaccineAppointment = mongoose.Schema(
    {
        patient: {
            type: String,
            required: true,
            ref: 'patientDetails',
        },
        doctor: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required : true
        },
        status: {
            type: String,
            default: "pending",
            enum: ["Scheduled", "pending", "closed"] // enum means string objects
        },
        remarks: {
            type: String,
            required: true,
        },
        prescription :[{
            type : mongoose.ObjectId,
             ref : 'Prescription'
        }], 
        pschological : {
  informant: { type: String },
  referByDoctor: { type: String },
  reasonForReferral: { type: String },
  chiefComplaints: { type: String },
  precipitation: { type: String },
  onset: { type: String },
  course: { type: String },
  progression: { type: String },
  background: { type: String },
  behavioralObservations: { type: String },
  toolsUsed: { type: String },
  interpretation: { type: String },
  impression: { type: String },
  suggestion: { type: String },
  hamA: {
    type : Object
  }
        },
        vitalSigns : {
            type : Object,
        }
    }
)

module.exports = mongoose.model('VaccineAppointment', VaccineAppointment);