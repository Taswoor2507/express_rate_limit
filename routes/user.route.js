import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { me } from "../controllers/user.controller.js";
const userRouter = Router()

userRouter.route("/me").get(authMiddleware , me)

export {userRouter};