import AsyncHanlder from "../handlers/AsyncHandler.js";
import CustomError from "../handlers/CustomError.js";
import jwt  from "jsonwebtoken";
import User from "../models/user.model.js";
// header  =  Bearer <token>
const authMiddleware = AsyncHanlder((async (req, res, next) => {
     const token  =  req.header("Authorization")?.replace("Bearer " , "");
    //  console.log(token, ":tttt")
    if (!token) {
        return next(new CustomError(401, "Token not found! you are unauthorized "))
    }

    const decodedToken = jwt.verify(token, process.env.JWT_ACCESSTOKEN_SECRET);
    //  get id from decoded token 
    const userId = decodedToken.userId;
    if (!userId) {
        return next(new CustomError(401, "Invalid token! you are unauthorized "))
    }

    //  serch in d using id
    const user = await User.findById(userId).select("+password -refreshToken");
    if (!user) {
        return next(new CustomError(404, "User not found"));
    }

    req.user =  user;
    req.role = user.role;
    next();
}))

export {authMiddleware};