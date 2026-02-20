import { transform } from "zod";
import { cloudinary } from "../config/cloudinary.config.js";
import streamifier from "streamifier";
// image/pmp  
const uploadToCloudinary = async({ resource_type="image"  , buffer , folder, transformation})=>{
     return new Promise((resolve , reject)=>{
        const stream = cloudinary.uploader.upload_stream(
            {folder , resource_type , transformation},
            (error , result)=>{
                if(error){
                    return reject(error);
                }
                resolve(result);

            }
        );
          
    //pipe
      streamifier.createReadStream(buffer).pipe(stream);
     })
}


export {uploadToCloudinary};