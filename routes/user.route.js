import { Router } from "express";
import {  getUsers, registerUser} from "../controllers/user.controller.js";
const userRouter = Router();

// // get all users 
// // userRouter.get("/all" , getAllUsers )
// userRouter.route("/all").get(getAllUsers)

// // get user dataa
// // userRouter.get("/about/:userId" , getUserData)
// userRouter.route("/about/:userId").get(getUserData)

// //serch user  country
// // userRouter.get("/search" , searchUser )
// userRouter.route("/search").get(searchUser);

userRouter.route("/all").get(getUsers)
userRouter.route("/register").post(registerUser);

export default userRouter;