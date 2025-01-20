const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;

const VaccineAppointment = mongoose.Schema(
    {
        patient: {
            type: ObjectId,
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
            default: "Scheduled",
            enum: ["Scheduled", "pending", "closed"] 
        },
        remarks: {
            type: String,
        },
        duration: {
            type : String,
        },
        prescription :[{
            type : mongoose.ObjectId,
             ref : 'Prescription'
        }], 
        psychodiagnostic :{
             type : Object
        },
        billing : {
            type : mongoose.ObjectId,
            ref : 'expenses'
        },
        hamA : {
            type : Object
        },
        vitalSigns : {
            type : Object,
        },
        hamD : {
            type : Object
        },
        cdrs : {
            type : Object
        },
        ymrs : {
            type : Object
        },
        panss: {
            type : Object
        },
        ybocs : {
            type : Object
        },
        notes : {
            type : String
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model('VaccineAppointment', VaccineAppointment);