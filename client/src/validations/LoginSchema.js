import * as z from "zod";

const loginSchema = z.object({
    email:z.email().trim(),
    password:z.string().trim().min(8 , "Password should atleast 8 chars")
})

export {loginSchema};