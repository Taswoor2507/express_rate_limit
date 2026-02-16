import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
const router = createBrowserRouter([
    {
        path:'/register',
        element:<Register/>
    } , 
    {
        path:"/login",
        element:<Login/>
    } , 
    {
        path:"dashboard",
        element:<ProtectedRoute/>,
        children:[
            {
                path:"",
                element:<Dashboard/>
            }   
        ]
    }
])


export {router};