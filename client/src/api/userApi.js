import { api } from "./axiosInstance"
const userApi = {
    register:(data)=>{
        return api.post("/users/register" , data)
    },
    me:()=>{
        return api.get("/users/me")
    }
}

export {userApi};