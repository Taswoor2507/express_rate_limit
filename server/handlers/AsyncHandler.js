//  fn -> return fn 
const AsyncHanlder = (fn)=>{
     return (req,res,next)=>{
           fn(req,res,next).catch((err)=>{

               console.log("ERRR" ,  err)
                next(err);
           })
     }
} 

export default AsyncHanlder;
