
const getAllUsers = (req,res,next)=>{
   res.json({message:"Get all users api hit....."})
}


const getUserData = (req,res,next)=>{
    const userId =  req.params.userId;
    res.json({message:`get user  ${userId}  profile data`})
}


const searchUser = (req,res, next)=>{
    const country = req.query.country;
     const city = req.query.city;

     res.json({message:`serch user from country ${country}  and city ${city}`})
}


export {getAllUsers , getUserData , searchUser};