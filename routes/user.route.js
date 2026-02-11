import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { changePassword, me } from "../controllers/user.controller.js";
import validate from "../middlewares/validate.js";
import { changePasswordSchema } from "../schemas/changePassword.js";
const userRouter = Router()

userRouter.route("/me").get(authMiddleware , me)
userRouter.route("/change-password").post(validate(changePasswordSchema) , authMiddleware , changePassword )
export {userRouter};