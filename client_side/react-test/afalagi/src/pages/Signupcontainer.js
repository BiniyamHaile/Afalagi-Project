import { useState } from "react"
import Header from "./Header"
import Signup from "./Signup"
import Companysignup from "./Companysignup"


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