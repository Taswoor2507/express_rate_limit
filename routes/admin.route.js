import { Router } from "express";
import { deleteUser } from "../controllers/admin.controler.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/allowRoles.middeware.js";
const adminRouter =  Router();
adminRouter.route("/delete/:userId").delete( authMiddleware ,allowRoles("admin") , deleteUser)

export {adminRouter}