import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import { Profile } from "../models/profile.model.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

const addProfile = AsyncHanlder(async(req,res , next)=>{
    const file =  req.file;
    const result = await uploadToCloudinary({resource_type:"image",  buffer:file.buffer , folder:"intern_profiles"})
    if(!result){
        return next(new CustomError(500 , "Failed to upload image"));
    }
     const profile = await Profile.create({secureUrl:result.secure_url , publicId:result.public_id})
     if(!profile){
        return next(new CustomError(500 , "Failed to create profile")); 
     }

     res.status(201).json({message:"Profile created successfully" , profile})

})


export {addProfile};