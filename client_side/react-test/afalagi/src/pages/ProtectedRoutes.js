import { Outlet , Navigate } from "react-router-dom";
import { getUser } from "../requests/getUser";



const ProtectedRoutes =()=>{
  const user =  getUser()

  return(
    user ? <Outlet /> : <Navigate to = "/login"/>
  )
}


export default ProtectedRoutes