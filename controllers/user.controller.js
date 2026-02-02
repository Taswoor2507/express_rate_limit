import CustomError from "../handlers/CustomError.js";

function getUsers(req,res,next){
   let  value = 0 ;
    if(value>0){
        res.staus(200).json(
            {
                message:"Get all users api hit succesfully"
            }
        )
    }else{
        next(new CustomError(400 , "NO user found ..."))
    }
}


export {getUsers};





// 1xx  
// 2xx 200, 201,
// 3Xx 
// 4xx  cleint 400 , 401 , 404
// 500 