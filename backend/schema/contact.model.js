const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        index:true

    },
    // subject:{
    //     type:String,
    //     minlength:[5,"minimum length should be 5 char"],
    //     required:true

    // },
    message:{
         type:String,
        minlength:[10,"minimum length should be 10 char"],
        required:true

    }



}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact