import jwt from "jsonwebtoken";
import CustomError from "../handlers/CustomError.js";

function generateAcccessToken (user){
    if(!user){
        throw new CustomError(404 , "User not found")
    } 

    const token  = jwt.sign({userId:user._id},  process.env.JWT_ACCESSTOKEN_SECRET , {expiresIn:"15m"})
    return token;
}


function generateRefreshToken (user){
    if(!user){
        throw new CustomError(404 , "User not found")
    } 
     const token  = jwt.sign({userId:user._id},  process.env.JWT_ACCESSTOKEN_SECRET , {expiresIn:"15d"})
    return token;  
}

export {generateAcccessToken , generateRefreshToken};