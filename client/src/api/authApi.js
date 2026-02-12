import { api } from "./axiosInstance"
//login , refresh . logout
const authApi = {
    login:(data)=>{
        return api.post("/auth/login" , data)
    }, 
    refreshToken:()=>{
        return api.post("/auth/refresh-token")
    }, 
    logout:()=>{
        return api.post("/auth/logout")
    }
}


export {authApi};