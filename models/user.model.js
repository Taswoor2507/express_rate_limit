import mongoose from 'mongoose';
// createdAt: , updatedAt:3feb 202 {firstname, email , password, gender , createdat , updatedat }
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        minLength:[3, "First name should have atleast 2 chars "],
        maxLength:[50 ,  "FirstName should have max 50 chars "],
        trim:true,
        required:true
    } , 
    email:{
        type:String,
        unique:true,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }, 
    password:{
        type:String,
        required:true,
        minLength:[8 , "Password must be at least 8 chars "] , 
        select:false
    } , 
    gender:{
        type:String,
        enum:["male" , "female" , "other"] , 
        required:true
    }
} , {timestamps:true})


const User = mongoose.model("User" , userSchema);
export default User;
