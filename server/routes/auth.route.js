import { Router } from "express";
import validate from "../middlewares/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";
import { googleAuthCallback, loginUser, logoutUser, refreshToken, registerUser } from "../controllers/auth.controller.js";
import loginUserSchema from "../schemas/LoginUser.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {passport} from "../config/passport.js"
const authRouter = Router();

authRouter.route("/register").post(validate(registerUserSchema) , registerUser)
authRouter.route("/login").post(validate(loginUserSchema) , loginUser);
authRouter.route("/refresh-token").post(refreshToken);
authRouter.route("/logout").get(authMiddleware, logoutUser)


// google oauth
// /api/v1/auth/google
authRouter.route("/google").get(passport.authenticate("google" ,{scope:["profile" , "email"], prompt:"consent"}));

// api/v1/auth/google/callback
authRouter.route("/google/callback").get(passport.authenticate("google" , { session:false , failureRedirect:"http://localhost:5173/auth/failure"}), googleAuthCallback)

export {authRouter};