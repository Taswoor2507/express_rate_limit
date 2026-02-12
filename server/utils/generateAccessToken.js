import jwt from "jsonwebtoken";
function generateAccessToken(user){
    // create token using jwt 
    // const token = jwt.sign(payload , secret , expire)
    const token =  jwt.sign({userId: user.id} , process.env.JWT_ACCESSTOKEN_SECRET  , {expiresIn:process.env.JWT_ACCESSTOKEN_EXPIRY})
   
    return token;
}

export default generateAccessToken;