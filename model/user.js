const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    fullName:String,
    email:String,
    password:String,
    adresse:String,
    telephone:String,
    userRole:{
        type:String,
        roles:["user","admin"],
        default:"user"
    }
});
module.exports=mongoose.model("User",userSchema)