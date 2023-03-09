

import "../styles/initial/header.css"
import "../styles/login.css"
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

 function Login() {
const [password , setPassword] = useState("");
  const [email , setEmail] = useState("")


    

  async function handleSubmit(e){    
    e.preventDefault() ;    
    const response = await fetch('http://localhost:3000/freelancer/login' , {
      method : "POST" , 
      headers : {
        "Content-Type" : "application/json"
      } , 
      body : JSON.stringify({
        email ,  password 
      })
    });

      const data = await response.json()
      const decoded = jwtDecode(data.user)
      
      if (data.user){
     
       localStorage.clear()
       
        localStorage.setItem("name" , decoded.name)
        localStorage.setItem("token" , data.user)
        localStorage.setItem("email" , decoded.email)
      
        window.location.href = "/freelancer"
      }else{
        //alert("check your email and password!")
      }
     }


  return (
  <div >

<div className = "employer login-form">
   <div>
  <h1> Sign up with :   </h1>
<p> <i class="bi bi-google d-inline"></i></p>      
   </div>
<form onSubmit = {handleSubmit} >
    <label className="m-4 fs-5"> Email :  
    <input value = {email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder = "email" className="input" />
    </label>
    <br/>
    
   <label className="fs-5">Password :
   <input  value = {password} onChange = {(e)=>{setPassword(e.target.value)}} placeholder = "password" className="input" />
     </label>
    
     <input type = "submit" value = "Log in" className="btn btn-secondary submit-btn border d-block" />
 
    </form>


      
    </div>

     

   
  </div>
  );
}


export default Login