const mongoose = require("mongoose");

const WantHistory = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    Amount:{
        required:true,
        type:String
    },
    Comment:{
        type:String,
        default:""
    },
    isDelete:{
        type:Boolean,
        require:true
    },
    Date:{
        type:String,
        default:new Date()
    }
});
module.exports =mongoose.model("WantHistory",WantHistory);