import * as z from "zod";

export const postSchema = z.object({
    title:z.string().min(3 , "Title must be at least 3 characters long").max(100 , "Title must be less than 100 characters long."),
    description:z.string().min(10 , "Description must be at least 10 characters long").max(500 , "Description must be less than 500 characters long."),
})
