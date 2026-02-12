import { success } from "zod";
import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import User from "../models/user.model.js";

const deleteUser = AsyncHanlder(async (req, res, next) => {
    //get user id from params 
    const userId = req.params.userId;
    //    search in db 
    const user =  await User.findByIdAndDelete(userId);
    if(!user){
        return next(new CustomError(404 , "user not found"))
    }
    

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
    })
    
})
export { deleteUser };