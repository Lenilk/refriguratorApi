const mongoose = require("mongoose");

const Want = mongoose.Schema({
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
    }
});
module.exports =mongoose.model("Want",Want);