import { success } from "zod";
import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import User from "../models/user.model.js";

const me = AsyncHanlder(async(req,res,next)=>{
     const user =  req.user
     res.status(200).json({
        success:true,
        message:"User fetched successfully",
        data:user
     })
})


//  change password 
//  login 
const changePassword = AsyncHanlder(async(req, res, next)=>{
   const user =  req.user  //{firstname, email, passwor:dkhdaksdhdk, gender }
    const {oldPassword , newPassword} = req.body;  //{}
   //   query db
   // const user = await User.findOne({email})
   // if(!user){
   //    return next(new CustomError(404 , " User not found"));
   // } 
   //  compare old password 
   const isPasswordCorrect = await user.comparePassword(oldPassword);
   if(!isPasswordCorrect){
      return next(new CustomError(400 , "Incorrect password"))
   } 
   //  oldpassword is not equal to new 
   if(oldPassword === newPassword){
      return next(new CustomError(400 , "New password should be different from old password"))
   } 

   // update new  password 
     user.password = newPassword;
     await user.save();



   res.status(200).json({
      success:true,
      message:"Password changed succesfully"
   })
})



export {me, changePassword}