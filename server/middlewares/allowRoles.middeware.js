import CustomError from "../handlers/CustomError.js";

function allowRoles(...roles){
    return (req, res,next)=>{
          const role =  req.role;  //
          if(!roles.includes(role)){
            return next(new CustomError(403 , "you are not authorized to access this route"))
          }
          next();
    }
}
export {allowRoles};
// allowROles(["admin"])