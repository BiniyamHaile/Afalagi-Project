import { useState } from "react"
import Header from "./Header"
import Signup from "./Signup"
import Companysignup from "./Companysignup"
import { Link } from "react-router-dom"
import { Message } from "./Login"

export default function Signupcontainer(){
    const[position , setPosition] = useState("Company")
    const handleToggle = ()=>{
        setPosition(position === "Company" ? "Employee" : "Company");
      
    }
    return(

        
        <div className="bg-light login-container ">

    
        <div className="d-flex w-100 justify-content-between  pt-4 " >
                <Header/>
               
        </div>

        <div className = "row ">


                    <div className = "col-12 " >
                        <Message  />
                    </div>


                    <div className = " col-12 login-form container  ">

                              <div className=" ms-auto me-auto form-contain text-center "> 
                         
                              <p className = "ms-md-4">
                                        Already have an account? 
                                        <span className="text-decoration-underline"> <Link to = "/login">Log in</Link> </span> 
                                       </p>
                                <p> Sign up as <span onClick={handleToggle} className = "toggler fw-italics text-decoration-underline "> {position} </span>  </p>
                                        {position === "Company" ? <Signup/> : <Companysignup/>}   
                                </div>
                    </div>

        </div>



            
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