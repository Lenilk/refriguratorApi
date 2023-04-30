const mongoose = require("mongoose");

const InRefrigurator = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    Amount:{
        required:true,
        type:String
    }
});
module.exports =mongoose.model("InRefrigurator",InRefrigurator);