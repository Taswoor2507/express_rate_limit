import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./routes/ProtectedRoute";
import GoogleAuth from "./pages/GoogleAuth";
const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/register',
        element:<Register/>
    } , 
    {
        path:"/login",
        element:<Login/>
    } , 
    {
       path:"/auth/success",
       element:<GoogleAuth/>
    },
    {
       path:"/auth/failure",
       element:<GoogleAuth/>
    }, 
    {
        path:"dashboard",
        element:<ProtectedRoute/>,   
        children:[
            {
                path:"",
                element:<Dashboard/>
            },
            {
                path:"create-post",
                element:<CreatePost/>
            }   
        ]
    }
])

export {router};