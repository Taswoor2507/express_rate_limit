import * as z from  "zod";

const registerUserSchema = z.object({
    firstName:z.string().trim().min(3 , "First name should be at least 3 chars"),
    email:z.email().trim(),
    password:z.string().trim().min(8 ,  "Password should atleast 8 chars"),
    gender:z.enum(["male" , "female" , "other"])
})

export {registerUserSchema};

