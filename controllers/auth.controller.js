import jwt from "jsonwebtoken";
import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import User from "../models/user.model.js";
import { generateAcccessToken , generateRefreshToken } from "../utils/generateTokens.js";
import { CookieOptions } from "../utils/cookieOptions.js";
import { sendEmail } from "../utils/sendEmail.js";
import { welcomeEmailTemplate } from "../emailTemplates/welcome.template.js";

// @controller 
// register user 
const registerUser = AsyncHanlder(async(req,res,next)=>{
//   validation field check 
    const {email , firstName , password ,  gender} = req.body
// cehck user already exist or not 
     const userExist =  await User.findOne({email});
     if(userExist){
        return next(new CustomError(400 , "User already exist"))
     } 
     
     const user  =  await User.create({
        firstName , email , password , gender 
     })

     if(!user){
         return next(new CustomError(500 ,  "Failed to create user "))
     }

    const welcomeTemplate = welcomeEmailTemplate(user.firstName, user.email)
    await sendEmail(user.email , "WELCOME TO OUR APPLICATION", welcomeTemplate )

     res.status(201).json({
        success:true,
       user
     })
})

// login
const loginUser =  AsyncHanlder(async(req,res,next)=>{
    const {email , password} = req.body;
    console.log(email , password)
   //  search user in databse 
   const user  = await User.findOne({email}).select("+password");
   if(!user){
      return next(new CustomError(400 , "Invalid email or password"));
   }
   // password compare 
   const isMatch =  await user.comparePassword(password)
   if(!isMatch){
      return next(new CustomError(400 , "Invalid email or password"));
   }


   // generate tokens
   const accessToken=generateAcccessToken(user)
   const refreshToken=generateRefreshToken(user)

   // store refresh token in db
   user.refreshToken = [{token:refreshToken , createdAt:Date.now()}]
   await user.save({validateBeforeSave:false})
   //store token in cookies  and reponse 
   res
   .cookie("refreshToken" , refreshToken  , CookieOptions)
   .status(200)
   .json({
      success:true,
      message:"User logged in successfully",
      data:{
         email:user.email,
         firstName:user.firstName,
         gender:user.gender,
         accessToken
      }
   })

  
   


})



// @controller
// refreh token 
const refreshToken = AsyncHanlder(async(req,res,next)=>{
   //  get refresh token form cookies 
   const incomingRefreshToken = req.cookies.refreshToken;
   if(!incomingRefreshToken){
      return next(new CustomError(401 , "Unauthorized request"))
   }

   // verify
  const decoded =jwt.verify(incomingRefreshToken , process.env.JWT_REFRESHTOKEN_SECRET)
   // {userID:DSFSD , iat , xpire}
  
  if(!decoded.userId){
    return next(new CustomError(401 , "TOKEN IS INVALID"))
  }
   //refreshtoken: [{token:"dasdadas"}]    
  const isTokenExist = await User.findOne({"refreshToken.token" : incomingRefreshToken})
   if(!isTokenExist){
      return next(new CustomError(401 , "TOKEN IS INVALID"))
   }

    const newRefreshToken =   generateRefreshToken(isTokenExist) 
    const newAccessToken = generateAcccessToken(isTokenExist)

   //  UPDATE DB`
      isTokenExist.refreshToken = [{token:newRefreshToken , createdAt:Date.now()}]
      await isTokenExist.save({validateBeforeSave:false});

   // update cookies 
   res
   .cookie("refreshToken" , newRefreshToken , CookieOptions)
   .status(200)
   .json({
      success:true,
      message:"Token refreshed successfully",
      data:{
         accessToken:newAccessToken
      }
   })





})




export {registerUser, loginUser, refreshToken};





// 1xx  
// 2xx 200, 201,
// 3Xx 
// 4xx  cleint 400 , 401 , 404
// 500 

