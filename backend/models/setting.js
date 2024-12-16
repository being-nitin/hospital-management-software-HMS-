const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;

const Setting = mongoose.Schema(
    {
        header : {
            type : String,
        },
        footer : {
            type : String,
        },
        printText : {
            type : String
        },
        treatment : {
            type : Object,
            required : true
        },
    }
)
module.exports = mongoose.model('setting', Setting);