import "./../styles/signup.css"
import { useState } from 'react';
import { URL } from "../requests/Requests";
export default function Companysignup() {
 
  const [password , setPassword] = useState("");
  const [email , setEmail] = useState("");
  const [name , setName] = useState("")



  async function handleSubmit(e){
   
    
    e.preventDefault() ;
     
    const response = await fetch(`${URL}/company/signin`, {
      method : "POST" , 
      headers : {
        "Content-Type" : "application/json"
      } , 
      body : JSON.stringify(
        {
          name , email , password
        }
      )
    })

      const data = await response.json()
      
    if(data.ok === true){
  
     window.location.href  = "/login"
    }     
    
  }


  return (
  <div className='sign-container '>
   <form onSubmit = {handleSubmit} className = "d-flex flex-column shadow-lg">

    <div className='inputs'>
   
    <input id = "cname" type = "text" onChange = {(e)=>{setName(e.target.value)}} required/>
    <label for = "cname">Company Name:  </label>
    </div>

    <div className='inputs'>
   
    <input id = 'cemail' type = "email" onChange = {(e)=>{setEmail(e.target.value)}} required />
    <label for = "cemail">Email  : </label>
    </div>
    
   
    <div className='inputs'>
   
    <input id = 'cpassword' type = "password" onChange = {(e)=>{setPassword(e.target.value)}} required />
    <label for = "cpassword">Password :</label> 
    </div>
    
  
    
    <div className='d-flex  input-containerjustify-content-center  mx-auto mb-4 '>
    <input type = "submit" value = "sign in" className='mx-auto btn btn-lg border shadow-lg bg-muted'  />
    </div>


   </form>
  
  </div>
  );
}


