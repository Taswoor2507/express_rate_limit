import * as z from "zod";

const changePasswordSchema = z.object({
    oldPassword:z.string().min(8 , "Password should be at least more than 8 chars").trim() , 
    newPassword:z.string().min(8 , "Password should be at least more than 8 chars").trim() 
})

export {changePasswordSchema};