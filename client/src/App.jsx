import {useForm}  from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {authApi} from "./api/authApi"
import {useAuth} from "./hooks/useAuth"
import './App.css'
import { loginSchema } from "./validations/LoginSchema"
function App() {
    const {register ,  handleSubmit ,reset , formState:{errors , isSubmitting}} =useForm({
       resolver:zodResolver(loginSchema),
       mode:"onBlur",
       reValidateMode:"onBlur",
       defaultValues:{
        email:"",
        password:""
       }
    })   
        const  { IsAuthenticated, setAccessToken , setUser} = useAuth()

    // onsubmit may kya hoga 
    async function onSubmit(data){
  
         try {
              const res =  await authApi.login(data);
              console.log(res, "RESPONSE ")
              setAccessToken(res.data.accessToken)
              setUser(res.data.user)
         } catch (error) {
          console.log(error?.message ,  "Server error")
            console.log(error , "rerroroo")
         }
    }
  //  server - > {email , password}  =>  {email:"abc" ,  password:"123"}
  //register
    console.log("Errorsssss" , errors)
  return (
    <>
     <form onSubmit={handleSubmit(onSubmit)}>
         <input {...register('email')}  type='email'/>
         {errors.email &&   <p style={{color:"red"}}>{errors.email.message}</p> }
         <input {...register('password')}    type="password" />
          {errors.password &&   <p style={{color:"red"}}>{errors.password.message}</p> }
         <button>Login</button>
     </form>


     <h1>{IsAuthenticated ?  "YOu are logged in":"You are not logged in"  }</h1>
    </>
  )
}

export default App
