import {Router} from "express";
import { createPost, postDetails } from "../controllers/post.controller.js";
import validate from "../middlewares/validate.js";
import { PostSchema } from "../schemas/post.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
const postRouter = Router();


postRouter.route("/create").post( validate(PostSchema) , authMiddleware ,  createPost);
postRouter.route("/:id").get(postDetails);

export {postRouter};