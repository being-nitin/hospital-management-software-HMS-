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
        psychodiagnostic :{
             type : Object
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
    },
    { timestamps : true}
)

module.exports = mongoose.model('VaccineAppointment', VaccineAppointment);