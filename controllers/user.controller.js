import { success } from "zod";
import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import User from "../models/user.model.js";

function getUsers(req,res,next){
   let  value = 0 ;
    if(value>0){
        res.staus(200).json(
            {
                message:"Get all users api hit succesfully"
            }
        )
    }else{
        next(new CustomError(400 , "NO user found ..."))
    }
}

// @controller
// @register user 
//    1 db 
//    2 async
//    get form data form req.body
//    check 
//     duplicte user 
//     save
//res user
//  {fname:"dasd" , email:"dsf" , password:"dasda" , gender:""}
// const registerUser = async (req,res,next)=>{


 

//   //  check duplication
//   const userExist = await User.findOne({email:email});
//     if(userExist){
//         return next(new CustomError(400 ,"Email already in use "));
//     }

//     // store in db

//     const user = await  User.create({firstName , email , password , gender});
//     if(!user){
//         return next(new CustomError(500  ,  "Failed to register user"))
//     } 

//     res.status(201).json({
//         message:"User Register successfully",
//         user
//     })



// }


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





export {getUsers, registerUser};





// 1xx  
// 2xx 200, 201,
// 3Xx 
// 4xx  cleint 400 , 401 , 404
// 500 