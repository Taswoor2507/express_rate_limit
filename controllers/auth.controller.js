import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import User from "../models/user.model.js";
import generateAccessToken from "../utils/generateAccessToken.js";

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

     res.status(201).json({
        success:true,
       user
     })
})


// @controller 
//  login user 
const loginUser =  AsyncHanlder(async(req,res,next)=>{
    let {email , password} = req.body;
  //  user exist or not 
    const userExist  =  await User.findOne({email}).select("+password");
    if(!userExist){
        return next(new CustomError(400 , "Invalid email or password"))
    }  

   // compare password 
       const checkPasswordCorrect  = userExist.comparePassword(password);
       if(!checkPasswordCorrect){
           return next(new CustomError(400 ,  "Invalid email or password"))
       }
     
    //   accces token 
    let token =  generateAccessToken(userExist)  ;

    // response 
  res.status(200).json({
    success:true,
    "message":"YOu are login successfully",
    "accessToken" :token
  })

})





export {registerUser, loginUser};





// 1xx  
// 2xx 200, 201,
// 3Xx 
// 4xx  cleint 400 , 401 , 404
// 500 