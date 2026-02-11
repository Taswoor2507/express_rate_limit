import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { changePassword, forgetPassword, me, resetPassword } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { changePasswordSchema } from "../schemas/changePassword.js";
import { forgetPasswordSchema } from "../schemas/forgetPassword.js";
const userRouter = Router()

userRouter.route("/me").get(authMiddleware , me)
userRouter.route("/change-password").post(validate(changePasswordSchema) , authMiddleware , changePassword )
userRouter.route("/forget-password").post( validate(forgetPasswordSchema) , forgetPassword )
userRouter.route("/reset-password/:token").post(resetPassword)
export {userRouter};