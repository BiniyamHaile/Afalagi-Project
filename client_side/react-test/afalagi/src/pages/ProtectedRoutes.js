import { Outlet , Navigate } from "react-router-dom";
import { getUser , getCompany } from "../requests/getUser";
import { useEffect , useState } from "react";


export function ProtectedRoutes(){
  const[freelancer , setFreelancer] = useState(null)
  const [isLoading  ,setLoading] = useState(true)
 
  useEffect(()=>{
      const fetcher = async()=>{
        const response = await getUser()
       
        setFreelancer(response.user)
        
    
        console.log(freelancer)
        setLoading(false)

      }
      fetcher()
  } ,[] )


  if(!isLoading){
    return(

      freelancer ? <Outlet /> : <Navigate to = "/login"/>
      
     )
  }
}


export const ProtectedCompany = ()=>{
  const [company , setCompany] = useState(null)
  const [isLoading , setLoading] = useState(true)
  useEffect(()=>{
    const fetcher = async()=>{
      const response = await getCompany()
      setCompany(response.user)
      setLoading(false)
    }
    fetcher()
} , [])


      if(!isLoading){
       return(
        company ? <Outlet/> : <Navigate to = "/login"/>
       )
      }

}