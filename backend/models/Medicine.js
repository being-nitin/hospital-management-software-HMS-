const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const Medicine = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        genericName: {
            type: String,
        
        },
        batchNo: {
            type: Number,
        },
        barCode: {
            type: Number,
        
        },
        description: {
            type: String,
            

        },
        quantity: {
            type: Number,
            
        },
        unitWeight: {
            type: Number,
            
        },
        type: {
            type: String,
            default: "Tablet",
            enum: ["Inj", "Capsule", "Tablet", "syrup" ] // enum means string objects
        },
        manDate: {
            type: String,
        
        },
        expDate: {
            type: String,
        },
        cost: {
            type: Number,
            
        },
        retailCost: {
            type: Number,
            
        },
        effects: {
            type: String,
    

        },
        vendor: {
            type: ObjectId,
            // required: true,
            ref: 'vendors',
        },
    }
)





module.exports = mongoose.model('Medicine', Medicine);