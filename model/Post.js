const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    /*id : {
        type : Number,
        required : true,
    },*/
    title : {
        type : String,

    },
    description : {
        type : String,
 
    },
    file:{
        type: String,
    }

    /*date : {
        type : String,
        default : Date.now,
    }*/
}, {
    timestamps: true
});

module.exports = mongoose.model("Posts",PostSchema)