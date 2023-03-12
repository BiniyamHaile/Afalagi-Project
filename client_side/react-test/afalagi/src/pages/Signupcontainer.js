import { useState } from "react"
import Header from "./Header"
import Signup from "./Signup"
import Companysignup from "./Companysignup"
import { Link } from "react-router-dom"

export default function Signupcontainer(){
    const[position , setPosition] = useState("Company")
    const clickHandler = ()=>{
        setPosition(position === "Company" ? "Employee" : "Company");
      
    }
    return(
        <div>
         <div className="header">
         <Header/>
        <Button position={position} onClick = {clickHandler}/>
         </div>
         <p className = "ms-md-4"> Already have an account? <span className="text-decoration-underline"> <Link to = "/login">Log in</Link> </span> </p>
            {position === "Company" ? <Signup/> : <Companysignup/>}            
        </div>
    )
}



function Button({position , onClick}){
   
 
    
   return(
    <>
     <button onClick = {onClick} className="btn btn-lg border shadow-lg"> Sign in as {position}</button>
    </>
   )
}