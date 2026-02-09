import AsyncHanlder from "../handlers/AsyncHandler.js";

const me = AsyncHanlder(async(req,res,next)=>{
     const user =  req.user
     res.status(200).json({
        success:true,
        message:"User fetched successfully",
        data:user
     })
})

export {me}