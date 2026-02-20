import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { imageMulter } from "../middlewares/ImageMulter.middleware.js";
import { addProfile } from "../controllers/profile.controller.js";
const profileRouter = Router()
const uploadImage = imageMulter(5, ["image/png" , "image/jpeg" , "image/gif", "image/jpg"])
profileRouter.route("/add-profile").post(authMiddleware, uploadImage.single("image") , addProfile)


export {profileRouter};