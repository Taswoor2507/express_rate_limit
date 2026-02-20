import mongoose from "mongoose";

const profileSchema =  new mongoose.Schema({
    secureUrl:{
        type:String,
    },
    publicId:{
        type:String,
    }
},{timestamps:true})

const Profile = mongoose.model("Profile" , profileSchema);

export {Profile};