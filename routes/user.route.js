import { Router } from "express";
const userRouter = Router();

// get all users 
userRouter.get("/all" , (req, res, next)=>{
   res.json({message:"Get all user end point hit ... "})
})

export default userRouter;