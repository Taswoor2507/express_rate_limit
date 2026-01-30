import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import userRouter from './routes/user.route.js';
import rateLimit from 'express-rate-limit';
//  configure dotenv
dotenv.config();
// create express app
const app = express();   //{}
//start configration
//app wala object us ko update karrahay han 
// first step  cors ko handle kartay han  
const allowedOrigins = ["http://localhost:5173"];
const allowReadonlyOrigins = ["*"]

//create cors option object 
const corsOptions = (req, cb)=>{
   const origin  =  req.header("origin");
   
    // FOR CLIENTS 
    if(!origin){
        cb(null, {origin:true})
    }



    // allow origin logic
    if(allowedOrigins.includes(origin)){
      return   cb(null , {
            origin:true,
            methods:["GET" , "POST" , "PUT" , "PATCH" , "DELETE"]
        })
    }


    //READ ONLY ORIGINS LOGIC 
    if(allowReadonlyOrigins.includes(origin)){
        return cb(null , {
            origin:true,
            methods:["GET"]
        })
    }




}

// implement cors middleware 
app.use(cors(corsOptions))

// configure  rate limiting 
const globalRateLimit = rateLimit({
    windowMs: 15 * 60 * 1000,  //15 minutes
    limit:100,
    legacyHeaders:false,
    standardHeaders:true,
    handler:(req,res)=>{
        const userIp = req.ip;
         res.status(429).json({
            message:`Too many request from ip ${userIp} please wait for 15 minutes` 
         })
    } 
})


// implement rate limit middleware 
app.use(globalRateLimit);


// url json middleware
app.use(express.json());


// url encoded middleware
app.use(express.urlencoded());



// routing implement 
app.use("/api/v1/users" , userRouter);



export default app    //powerful / modify {}