import { useAuth } from '../hooks/useAuth'

const Dashboard = () => {

   const {user} =  useAuth()
  return (
    <div>Dashboard  hello  {user.firstName}</div>
  )
}

export default Dashboard