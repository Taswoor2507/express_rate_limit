import { api } from "./axiosInstance"

const authApi = {
    login: (data)=>{
        return api.post("/auth/login" , data)
    } , 
    refreshToken:()=>{
        return api.post("/auth/refresh-token");
    }
}

export {authApi};