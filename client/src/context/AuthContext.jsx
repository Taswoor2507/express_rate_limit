import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { authApi } from "../api/authApi";
import { useLayoutEffect } from "react";
import { api } from "../api/axiosInstance";
// reate context 
const AuthContext = createContext();

//create/setup provider

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(undefined);
    const isAuthenticated = accessToken ? true : false


    // restoresession
    useEffect(() => {
        async function session() {
            try {
                const res = await authApi.refreshToken();
                setAccessToken(res.data.data.accessToken);
                setUser(res.data.user);
            } catch (error) {
                 setAccessToken(null);
                 setUser(null);
            }
        }
        session();
    }, [])




    // interceptors 
    // request 
    //response 

    // request interceptor
    useLayoutEffect(()=>{
          const requestInterceptor = api.interceptors.request.use(
            (config)=>{
                   if(accessToken && !config._retry){
                      config.headers.Authorization = `Bearer ${accessToken}`
                   } 
                   return api(config);
            },
            (error)=>{
                return Promise.reject(error)
            }
          )

          return ()=>{
             return api.interceptors.request.eject(requestInterceptor)
          }
    },[accessToken])



    //response interceptor 
    useLayoutEffect(()=>{
       const responseInterceptor = api.interceptors.response.use(
        (res)=>{
            return res
        },
         async (error)=>{
            const failedRequest = error.config;  //reqobj
            if(error.response.status === 401  ||  error.response.status === 403 && !failedRequest._retry){
                failedRequest._retry = true;
               try {
                const  res=  await authApi.refreshToken(); ///aut/refreshtoken
                failedRequest.headers.Authorization = `Bearer ${res.data.accessToken}`
                setUser(res.data.user);
                setAccessToken(res.data.accessToken);
                return failedRequest
               } catch (error) {
                  setUser(null)
                  setAccessToken(null)
               }
             
            }

            return Promise.reject(error);

         }
       ) 

       return ()=>{
          return api.interceptors.response.eject(responseInterceptor)
       }
    } , [accessToken])







    return <AuthContext.Provider values={
        { user, setUser, accessToken, setAccessToken, isAuthenticated }}>
        {children}
    </AuthContext.Provider>
}

export { AuthContext, AuthProvider };