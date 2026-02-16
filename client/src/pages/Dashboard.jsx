import { authApi } from '../api/authApi'
import { useAuth } from '../hooks/useAuth'
import {useNavigate} from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const {user, loading, setAccessToken, setUser} =  useAuth()
  async function handleLogout(){
          try {
             const res =await authApi.logout();
             // Clear auth state
             setAccessToken(null);
             setUser(null);
             navigate("/login");
          } catch (error) {
              console.log(error , "in  logout")  
          }
  }

  return (
    <>
    {loading ? <div>Loading...</div> : <div>Dashboard  hello  {user?.firstName}</div>}
    <button onClick={handleLogout}>Logout</button>
    </>
  )
}

export default Dashboard