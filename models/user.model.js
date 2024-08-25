const mongoose = require("mongoose")

const userSchema = mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin","user"]
    }
},{
    versionKey:false,
    timestamps:true
})
const UserModel = mongoose.model("User",userSchema)

module.exports = UserModel