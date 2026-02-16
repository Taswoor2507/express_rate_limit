import { Router } from "express";
import validate from "../middlewares/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";
import { loginUser, logoutUser, refreshToken, registerUser } from "../controllers/auth.controller.js";
import loginUserSchema from "../schemas/LoginUser.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const authRouter = Router();

authRouter.route("/register").post(validate(registerUserSchema) , registerUser)
authRouter.route("/login").post(validate(loginUserSchema) , loginUser);
authRouter.route("/refresh-token").post(refreshToken);
authRouter.route("/logout").get(authMiddleware, logoutUser)
export {authRouter};