const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const patientDetails = mongoose.Schema(
    {
        doctor : {
            type : mongoose.ObjectId,
            required : true,
            ref :'User' 
        },
        firstName : {
            type : String
        },
        lastName: {
            type: String
        },
        patientNumber: {
            type: Number,
            required: true,
        },
        regDate: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        phoneNo: {
            type: String
        },
        birthDate: {
            type: String
        },
        // email: {
        //     type: String
        // },
        guardian: {
            type: String
        },
        relation: {
            type: String
        },
        gender: {
            type: String,
            default: "Male",
            enum: ["Male", "Female"], // enum means string objects
            required: true,
        },
        symptoms : {
            type : String
        },
        vital : {
            type : Array
        },
        // statusPatient: {
        //     type: String,
        //     default: "Cured",
        //     enum: ["Cured", "Under Treatment"],
        //     required: true,
        // },
        // patientType: {
        //     type: String,
        //     default: "In Patient",
        //     enum: ["In Patient", "Out Patient"],
        //     required: true,
        // },
        image: {
            type: String,
        },
        
    }
)





module.exports = mongoose.model('patientDetails', patientDetails);