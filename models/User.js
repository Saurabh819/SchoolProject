const mongoose = require("mongoose");
const { PassThrough } = require("stream");

const UserSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
    role:{type:String, enum:['teacher','student'], default:"student"}
},{timestamps:true});



const User = mongoose.model('User',UserSchema);

module.exports = User;