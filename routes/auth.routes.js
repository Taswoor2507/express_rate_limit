import { Router } from "express";
import { loginUser, registerUser} from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.js";
import registerUserSchema from "../schemas/RegisterUser.js";
import loginUserSchema from "../schemas/LoginUser.js";
const authRouter = Router();

authRouter.route("/register").post( validate(registerUserSchema) , registerUser);
authRouter.route("/login").post(validate(loginUserSchema) , loginUser)
export default authRouter;