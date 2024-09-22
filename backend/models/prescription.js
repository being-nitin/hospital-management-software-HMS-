const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const Prescription = mongoose.Schema(
    {
        doctor : {
            type: ObjectId,
            ref: 'User',
        },
        patient: {
            type: ObjectId,
            ref: 'patientDetails',
        },
        user: {
            type: ObjectId,
            ref: 'User',
        },
        treatment: {
            type: ObjectId,
            required: true,
            ref: 'Treatment',
        },
        medicine: {
            type: String,
            required: true,

        },
        time: {
            type: Number,
            required: true
        },
        days: {
            type: Number,
            required: true
        },
        take: {
            type: String,
            default: "Morning",
            enum: ["1-1-1", "0-0-1" , "0-1-0" , "1-0-0" , "1-1-0" , "0-1-1" , "1-0-1"] // enum means string objects
        },
        test: {
            type: ObjectId,
            required: true,
            ref: 'testSchema',
        },
        paid: {
            type: String,
            default: "Un-paid",
            enum: ["Un-paid", "Paid"]
        },
        history: {
            type: String,
            required: true,

        }
    }
)





module.exports = mongoose.model('Prescription', Prescription);