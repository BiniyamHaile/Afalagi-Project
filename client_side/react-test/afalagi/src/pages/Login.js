import "../styles/initial/header.css"
import "../styles/login.css"
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { URL } from "../requests/Requests";
import { EmployerContext } from "../components/Contexts";
import Header from "./Header";
import { Navigate } from "react-router-dom";



export default function Login() {
    
    
    const [employer , setEmployer] = useState(true)
    



    const handleToggle = ()=>{setEmployer(!employer)}
    

  return (
  <div className="bg-light login-container ">

    
    <div className="d-flex w-100 justify-content-between  pt-4 " >
            <Header/>
           
    </div>

    <EmployerContext.Provider  value = {employer} >
    

    <div className = "row ">
        <div className = "col-12 " >
             <Message  />
        </div>
        <div className = " col-12 login-form container  ">

                    <div className=" ms-auto me-auto form-contain text-center "> 
                            <p className =  "large-text"> Sign in as <span onClick={handleToggle} className = "toggler fw-italics text-decoration-underline "> {employer ? "Company" : "Freelancer" } </span> </p>
                            <div>
                                {/* <p className="large-text" > Sign in with :  <span> <i className="bi bi-google"></i>  </span> </p> */}
                                
                            </div>


                            <Form/>
                            <Signlink/>
                    </div>
            
            </div>
    </div>
    

   



    </EmployerContext.Provider>

     

   
  </div>


  );
}


function Errormessage({tried}){

   
  
  return(
    <div className={tried === true  ?  "d-block text-center" :  "d-none"}> <p className = "text-danger"> Invalid credentials! </p> </div>
        )
}



export function Message(){
    return(
        <div className = "mb-5" >
        <h1 className = "lobster text-center"> <span >አ</span>falagi! </h1>   
        
        </div>     
    )
}


function Form(){
    
    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("")
    const [tried , setTried] = useState(false)

    const employer = useContext(EmployerContext)



    async function handleSubmit(e){    
        e.preventDefault() ;    
        const role = employer ? "freelancer"  :"company"
        console.log(`email is ${email}`)
        console.log(`password is ${password}!`)
        const response = await fetch(`${URL}/${role}/login` , {
            method : "POST" , 
            headers : {
            "Content-Type" : "application/json"
            } , 
            body : JSON.stringify({
            email ,  password 
            })
        });
    
            const data = await response.json()
           
            
            
            
            if (data.user){
            const decoded = jwtDecode(data.user)
            localStorage.clear()
            
            localStorage.setItem("name" , decoded.name)
            localStorage.setItem("email" , decoded.email)
            localStorage.setItem("token" , data.user)
            localStorage.setItem("id" , decoded.id)
            
            if(employer){
                localStorage.setItem("id" , decoded.id)
            } 
            <Navigate to = "/freelancer"/>
            window.location.href = employer ? "/freelancer" : "/chome"
            }else{
            setTried(true)
            }
            }
    






    return(
        <form onSubmit = {handleSubmit} >
       <div className="inputs">
       <input  type = "text" onChange = {(e)=>{setEmail(e.target.value)}}   className={tried ? "input tried" : "input" } required />
        <label className={tried ? "border-b-danger  " :  ""}> {employer ? "Email or Username " : "Company Email  or Username"} </label>
       </div>
      
        <div className="inputs">
        <input type = "password"    onChange = {(e)=>{setPassword(e.target.value)}}  className="input" required />
        <label className={tried ? "border-b-danger " :  ""}>Password  </label>
        </div>
       

        <Errormessage tried = {tried}/>
        <input type = "submit" value = "Log in" className="btn btn-secondary w-75 p-3 submit-btn border d-block" />
 
    </form>

    )
}


function Signlink(){
    const handleClick = ()=>{ window.location.href = "/signup" }
    return(
        // <button className="signin-link me-md-5 btn-lg btn-secondary w-100" onClick={handleClick} >  Sign up </button>
        <>
        <p onClick={handleClick} className = "text-center cursor-pointer">  Create an account? </p>
        </>
    )
}


