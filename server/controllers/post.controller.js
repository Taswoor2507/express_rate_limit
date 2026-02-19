import AsyncHanlder from "../handlers/AsyncHandler.js"
import CustomError from "../handlers/CustomError.js";
import  {Post} from "../models/post.model.js";
// create post controller;

const createPost = AsyncHanlder(async(req , res,next)=>{
     const {title, description} = req.body;
     const user = req.user
    // store post in db  
    const post  = await Post.create({
        title,
        description,
        user:user._id
    })

    if(!post){
        return next(new CustomError(500 , "Post creation failed.."))
    }

    res.status(201).json({
        success:true,
        message:"Post created successfully",
        post
    })
})

const postDetails = AsyncHanlder(async(req,res,next)=>{
       const postId = req.params.id;
       const post = await Post.findById(postId).populate("user", "firstName email gender");
         if(!post){
            return next(new CustomError(404 , "Post not found"))
         }
         res.status(200).json({
            success:true,
            post
         })
})




export {createPost , postDetails};

