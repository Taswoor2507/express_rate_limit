import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authApi } from "../api/authApi"
import { useAuth } from "../hooks/useAuth"
import { loginSchema } from "../validations/LoginSchema"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import GoogleButton from "../components/GoogleButton"
function Login() {
  const navigate = useNavigate();
  const { IsAuthenticated, setAccessToken, setUser } = useAuth()
  useEffect(() => {
    if (IsAuthenticated) {
      navigate("/dashboard")
    }
  }, [IsAuthenticated])


  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // onsubmit may kya hoga 
  async function onSubmit(data) {

    try {
      const res = await authApi.login(data);
      console.log(res, "RESPONSE ")
      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
    } catch (error) {
      console.log(error?.message, "Server error")
      console.log(error, "rerroroo")
    }
  }
  //  server - > {email , password}  =>  {email:"abc" ,  password:"123"}
  //register
  console.log("Errorsssss", errors)
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register('email')} type='email' />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
          <input {...register('password')} type="password" />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
          <button>Login</button>
        </form>
      </div>

      <div>
        <GoogleButton/>
      </div>

    </>
  )
}

export default Login
