import { Router } from "express";
import { getAllUsers , getUserData , searchUser } from "../controllers/user.controller.js";
const userRouter = Router();

// get all users 
// userRouter.get("/all" , getAllUsers )
userRouter.route("/all").get(getAllUsers)

// get user dataa
// userRouter.get("/about/:userId" , getUserData)
userRouter.route("/about/:userId").get(getUserData)

//serch user  country
// userRouter.get("/search" , searchUser )
userRouter.route("/search").get(searchUser);

export default userRouter;