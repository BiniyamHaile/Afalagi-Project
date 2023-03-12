import Login from "./Login";
import Companylogin from "./Companylogin"
import Header from './Header'
import { useState } from "react";
import "./../styles/login.css"

export default function(){

    const[activate , setActivate] = useState("employee")
    function clickHandler(){
        setActivate(activate === "employee" ? "employer" : "employee")
    }
    return(
      
      
       <div className="gradient">



                <Header/>


                <div  className = "bodyContainer">
                <div >
                    <h1 className = "lobster text-light "> <span >አ</span>falagi! </h1>
                    <p className="logoText ">  We are pleased to make your job done accordingly!  </p>
                </div>        

                <div>
                    <p onClick = {clickHandler}>click here to login as <span className="loginText text-light fw-italics text-decoration-underline"> {activate}</span> </p>
                    
                <div> {activate === "employee" ? <Login/> : <Companylogin/>}</div>

                </div>
                </div>


        
        
       </div>

        
    )
}


