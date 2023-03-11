

import "../styles/initial/header.css"
import "../styles/login.css"
import { useState } from 'react';
import jwtDecode from 'jwt-decode';
import { URL } from "../requests/Requests";
 function Login() {
const [password , setPassword] = useState("");
  const [email , setEmail] = useState("")
  const [tried , setTried] = useState(false)

    

  async function handleSubmit(e){    
    e.preventDefault() ;    
    const response = await fetch(`${URL}/company/login` , {
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
        console.log("proved")
        window.location.href = "/chome"
      }else{
        //alert("check your email and password!")
        console.log("invalid credential!")
      }
     }


  return (
  <div >

<div className = "employer login-form">



   <div>
  <h1> Sign up with : </h1>
      <p><i className="bi bi-google"></i></p>
   </div>



<form onSubmit = {handleSubmit} >
    <label className="m-4 fs-5"> Company email : 
    <input value = {email} onChange = {(e)=>{setEmail(e.target.value)}} placeholder = "email" className="input" />
    </label>
    <br/>
    
   <label className="fs-5">Password :
   <input  value = {password} onChange = {(e)=>{setPassword(e.target.value)}} placeholder = "password" className="input" />
     </label>
     <Errormessage tried = {tried} />
     <input type = "submit" value = "Log in" className="btn btn-secondary submit-btn border d-block" />
 
    </form>


      
    </div>

     

  
   
  </div>
  );
}



function Errormessage({tried}){
  console.log(`tried is ${tried}`)
  return(
    <div className={tried === true  ?  "d-block text-center" :  "d-none"}> <p className = "text-danger"> Invalid credentials! </p> </div>
  )
}

export default Login