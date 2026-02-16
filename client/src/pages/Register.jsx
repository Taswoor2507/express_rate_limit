import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { registerUserSchema } from '../validations/registerUserSchema'
import { userApi } from '../api/userApi'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate =  useNavigate();
    const {register , reset, handleSubmit , formState:{errors, isSubmitting} , setError } = useForm({
        resolver:zodResolver(registerUserSchema),
        mode:"onBlur",
        reValidateMode:"onBlur",
        defaultValues:{
            firstName:"",
            email:"",
            password:"",
            gender:""
        }
    })


  async function onSubmit(data){   
         try {
            const res =  await userApi.register(data);
            navigate("/login")
         console.log(res , "Register")  
         } catch (error) {
            if(error.response.data.message){
                 setError("general" , {type:"server" , message:error.response.data.message})
            }else{
                setError("general" , {type:"server" , message:"Failed to register user"})
            }
         }
    }
  return (
    <div>
        <h1>Register form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text'   {...register("firstName")} placeholder='Firstname'    />
            {errors.firstName && <p>{errors.firstName.message} </p>}

            <input type="email"  {...register("email")} placeholder='Email'    />
            {errors.email && <p>{errors.email.message} </p>}

            <input type="password"   {...register("password")} placeholder='Password'    />
            {errors.password && <p>{errors.password.message} </p>}


           
             <input type='radio'  name='gender'  value="male"   {...register("gender")} />
             <input type='radio'  name='gender'  value="female"   {...register("gender")} />
             <input type='radio'  name='gender'  value="other"   {...register("gender")} />
             {errors.gender && <p>{errors.gender.message} </p>}


             <button  type='submit'>{isSubmitting ? "Submitting..":"Submit" }</button>

        </form>

        {errors.general &&  <p>{errors.general.message}</p> }
    </div>
  )
}

export default Register