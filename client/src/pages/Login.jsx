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
  }, [IsAuthenticated, navigate])

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: ""
    }
  })

  async function onSubmit(data) {
    try {
      const res = await authApi.login(data);
      console.log(res, "RESPONSE ")
      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
    } catch (error) {
      console.log(error?.message, "Server error")
      console.log(error, "rerroroo")
      
      // Handle server-side errors
      if (error.response?.data?.message) {
        setError("general", { 
          type: "server", 
          message: error.response.data.message 
        })
      } else if (error.response?.data?.error) {
        setError("general", { 
          type: "server", 
          message: error.response.data.error 
        })
      } else if (error.message) {
        setError("general", { 
          type: "server", 
          message: "Network error. Please try again." 
        })
      } else {
        setError("general", { 
          type: "server", 
          message: "Login failed. Please check your credentials and try again." 
        })
      }
    }
  }

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Container - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700">
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white p-12">
              <div className="mb-8">
                <svg className="w-32 h-32 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h2 className="text-4xl font-bold mb-4">Welcome Back!</h2>
                <p className="text-xl text-blue-100 mb-6">
                  Sign in to access your personalized dashboard and continue your journey with us.
                </p>
                <div className="space-y-4 text-left max-w-md mx-auto">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Secure authentication</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Access to all features</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-blue-100">Personalized experience</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Container - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                {...register('email')}
                type='email'
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                {...register('password')}
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Server Error Display */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleButton />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
