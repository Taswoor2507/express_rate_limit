import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { changePassword, forgetPassword, me, resetPassword } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { changePasswordSchema } from "../schemas/changePassword.js";
import { forgetPasswordSchema } from "../schemas/forgetPassword.js";
// import { imageMulter } from "../middlewares/ImageMulter.middleware.js";
// import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
// const uploadImage = imageMulter(5 ,["image/png" , "image/jpeg" , "image/gif", "image/jpg" ] ) //{}
const userRouter = Router()
// <input type="file" name="image"
userRouter.route("/me").get(authMiddleware , me)
userRouter.route("/change-password").post(validate(changePasswordSchema) , authMiddleware , changePassword )
userRouter.route("/forget-password").post( validate(forgetPasswordSchema) , forgetPassword )
userRouter.route("/reset-password/:token").post(resetPassword)
// userRouter.route("/profile").post(authMiddleware , uploadImage.single("image") , async(req,res,next)=>{
//     console.log(req.files , "FILEOJECT");
//     // res.json({message:"Image uploaded successfully"})
//      const result =await  uploadToCloudinary({resource_type:"image" , buffer:req.file.buffer , folder:"intern_profiles" })
//      if(result){
//         res.json({message:"Image uploaded successfully" , result})
//      }

// })
export {userRouter};