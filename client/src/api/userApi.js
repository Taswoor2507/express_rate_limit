import { api } from "./axiosInstance"

const userApi =  {
    register:(data)=>{
        return api.post("/auth/register" , data)
    }
}


export {userApi};