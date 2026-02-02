function ErrorMiddleware(err,req,res,next){
    console.log("message frim error middleware ...")
   const message =  err.message;
   const  statusCode =  err.statusCode || 500 ;
  
  res.status(statusCode).json({
    message:message,
    // stack:err.stack
  })
}


export  default ErrorMiddleware





//error class us ko customize karna 
// error middleware (error, req, res , next)
//  erro middleware ko use karna app may last

