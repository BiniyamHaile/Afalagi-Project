import { Outlet , Navigate } from "react-router-dom";
import { getUser } from "../requests/getUser";



const ProtectedRoutes =()=>{
  const user =  getUser()
  console.log(`user is ${user}`)
  return(
     !user.user ? <Outlet /> : <Navigate to = "/login"/>
  )
}


export default ProtectedRoutes