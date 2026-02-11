import { resetPasswordEmailTemplate } from "../emailTemplates/resetPassword.template.js";
import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import User from "../models/user.model.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";
const me = AsyncHanlder(async (req, res, next) => {
   const user = req.user
   res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user
   })
})


//  change password 
//  login 
const changePassword = AsyncHanlder(async (req, res, next) => {
   const user = req.user  //{firstname, email, passwor:dkhdaksdhdk, gender }
   const { oldPassword, newPassword } = req.body;  //{}
   //   query db
   // const user = await User.findOne({email})
   // if(!user){
   //    return next(new CustomError(404 , " User not found"));
   // } 
   //  compare old password 
   const isPasswordCorrect = await user.comparePassword(oldPassword);
   if (!isPasswordCorrect) {
      return next(new CustomError(400, "Incorrect password"))
   }
   //  oldpassword is not equal to new 
   if (oldPassword === newPassword) {
      return next(new CustomError(400, "New password should be different from old password"))
   }

   // update new  password 
   user.password = newPassword;
   await user.save();



   res.status(200).json({
      success: true,
      message: "Password changed succesfully"
   })
})


//forget password 
const forgetPassword = AsyncHanlder(async (req, res, next) => {
   const { email } = req.body;
   //  chekc user 
   const user = await User.findOne({ email });
   if (!user) {
      return next(new CustomError(404, "No account found with this email"))
   }

   //generarte forgetPasstoken
   const token = crypto.randomBytes(32).toString('hex')
   //   store token in db
   user.forgetPasswordToken = token
   user.forgetPasswordExpire = Date.now() + 10 * 60 * 60 * 1000
   await user.save();

   // send email to user 
   const forgetPasswordTemplate = resetPasswordEmailTemplate(user.firstName, token)


   // send email 
   await sendEmail(user.email, "FORGET PASSWORD", forgetPasswordTemplate)


   res.status(200).json({
      success: true,
      message: "Reset password link send to your gmail, please check your email and reset your password "
   })
})



// reset password 
const resetPassword =  AsyncHanlder(async(req,res,next)=>{
   // password , confimpasswrod 
   const {token} = req.params;
     const {password , confirmPassword } = req.body;
      if(password !== confirmPassword){
         return next(new CustomError(400 , "Password and confirm must be same"))
      }



    const userToken = await User.findOne({forgetPasswordToken:token , forgetPasswordExpire:{$gt:Date.now()} }).select("+password");

   if(!userToken){
      return next(new CustomError(404 , "Reset token expired please try again"));
   }

    userToken.password = password
   //  await userToken.save();

   //  null the fields 
   userToken.forgetPasswordToken = null
   userToken.forgetPasswordExpire = null
   await userToken.save()
   //  check is 
      
   res.status(200).json({
      success:true,
      message:"Password reset succesfully"
   })


})


export { me, changePassword, forgetPassword, resetPassword }