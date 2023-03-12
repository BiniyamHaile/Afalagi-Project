import "../styles/initial/header.css"
import "../styles/login.css"
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { URL } from "../requests/Requests";
import { EmployerContext } from "../components/Contexts";
import { Link, useSearchParams } from "react-router-dom";
import Header from "./Header";



export default function LoginReuse() {

 
    const [employer , setEmployer] = useState(true)
    



    const handleToggle = ()=>{setEmployer(!employer)}
    

  return (
  <div className="bg-secondary login-container ">

    
    <div className="d-flex w-100 justify-content-between pt-4" >
            <Header/>
            <Signlink/>
    </div>

    <EmployerContext.Provider  value = {employer} >
    

    <div className = "row ">
        <div className = "col-md-6 col-lg-6 d-md-flex align-items-center" >
             <Message  />
        </div>
        <div className = " login-form container col-md-4 col-lg-6   d-md-flex align-items-center ">

                    <div className="border ms-auto me-auto"> 
                            <p className =  "large-text"> Sign in as <span onClick={handleToggle} className = "toggler fw-italics text-decoration-underline text-light"> {employer ? "Company" : "Freelancer" } </span> </p>
                            <div>
                                <p className="large-text" > Sign in with :  <span> <i className="bi bi-google"></i>  </span> </p>
                                
                            </div>


                            <Form/>
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



function Message({employer}){
    return(
        <div >
        <h1 className = "lobster text-light text-center"> <span >አ</span>falagi! </h1>
        <p className="logoText text-center ">  We are pleased to make {employer ? "you get your dream job sooner! " : " your job done accordingly!"}  </p>
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
            console.log(data)
            
            
            
            if (data.user){
            const decoded = jwtDecode(data.user)
            localStorage.clear()
            
            localStorage.setItem("name" , decoded.name)
            localStorage.setItem("email" , decoded.email)
            localStorage.setItem("token" , data.user)
            
            
            window.location.href = employer ? "/freelancer" : "/chome"
            }else{
            setTried(true)
            }
            }
    






    return(
        <form onSubmit = {handleSubmit} >
        <label className={tried ? "border-danger m-4 fs-5" :  "m-4 fs-5"}> Email : 
            <input value = {email} type = "email" onChange = {(e)=>{setEmail(e.target.value)}} placeholder = {employer ? "Email  " : "Company Email  "} className="input" />
        </label>
        <br/>
  
        <label className={tried ? "border-danger fs-5" :  "fs-5"}>Password :
            <input  value = {password} onChange = {(e)=>{setPassword(e.target.value)}} placeholder = "password" className="input" />
        </label>

        <Errormessage tried = {tried}/>
        <input type = "submit" value = "Log in" className="btn btn-secondary submit-btn border d-block" />
 
    </form>

    )
}


function Signlink(){
    const handleClick = ()=>{ window.location.href = "/signup" }
    return(
        <button className="signin-link me-md-5" onClick={handleClick} >  Sign up </button>
    )
}


