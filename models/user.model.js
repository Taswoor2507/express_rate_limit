import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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
    },
    refreshToken:[
        {
            token:{
                type:String,
                createdAt:Date,
            }
        }
    ],
    role:{
        type:String,
        enum:["user" , "admin"],
        default:"user"
    }
} , {timestamps:true})


// pre post 
userSchema.pre("save" , async function () {
   if(!this.isModified("password")){
      return
   }  
   try {
       this.password =  await bcrypt.hash(this.password , 10)
   } catch (error) {
      console.log("Failed to hash password ");
   } 
})


// comapre pasword custom method 
userSchema.methods.comparePassword =  async function(password){
     const isCorrect =  await bcrypt.compare(password , this.password) ;
     return isCorrect;
}

// comparepassord(pass@123) -> bool true /false



// compare password 
userSchema.methods.comparePassword = async function(password){
     const isPasswordCorrect = await  bcrypt.compare(password , this.password);
        return isPasswordCorrect
       }





const User = mongoose.model("User" , userSchema);
export default User;
// [{token:"dsafsfsdfdsf"},{},{}]