const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;

const Setting = mongoose.Schema(
    {
        prescription : {
            header : {
                type : String,
            },
            footer : {
                type : String,
            },
            logo : {
                type : String
            }
        },
        patient : {
            header : {
                type : String,
            },
            footer : {
                type : String,
            },
            logo : {
                type : String
            }
        },
        forms : {
            header : {
                type : String,
            },
            footer : {
                type : String,
            },
            logo : {
                type : String
            }
        },
        expense : {
            header : {
                type : String,
            },
            footer : {
                type : String,
            },
            logo : {
                type : String
            }
        },
        billing : {
            header : {
                type : String,
            },
            footer : {
                type : String,
            },
            logo : {
                type : String
            }
        },
        printText : {
            type : String
        },
        treatment : {
            type : Object,
          
        },
        clinicalNotes : {
            type : Object
        }
    }
)
module.exports = mongoose.model('setting', Setting);